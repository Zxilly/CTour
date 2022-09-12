FROM ubuntu:focal AS stage_emsdk_build

ENV EMSCRIPTEN_VERSION=latest
ENV EMSDK /emsdk

RUN echo "## Start building" \
    && echo "## Update and install packages" \
    && apt-get -qq -y update \
    && apt-get -qq install -y --no-install-recommends \
        binutils \
        build-essential \
        ca-certificates \
        file \
        git \
        python3 \
        python3-pip \
    && echo "## Done"

RUN git clone https://github.com/emscripten-core/emsdk.git ${EMSDK}

RUN echo "## Install Emscripten" \
    && cd ${EMSDK} \
    && ./emsdk install ${EMSCRIPTEN_VERSION} \
    && echo "## Done"

RUN cd ${EMSDK} \
    && echo "## Generate standard configuration" \
    && ./emsdk activate ${EMSCRIPTEN_VERSION} \
    && chmod 777 ${EMSDK}/upstream/emscripten \
    && chmod -R 777 ${EMSDK}/upstream/emscripten/cache \
    && echo "int main() { return 0; }" > hello.c \
    && ${EMSDK}/upstream/emscripten/emcc -c hello.c \
    && cat ${EMSDK}/upstream/emscripten/cache/sanity.txt \
    && echo "## Done"

# Cleanup Emscripten installation and strip some symbols
RUN echo "## Aggressive optimization: Remove debug symbols" \
    && cd ${EMSDK} && . ./emsdk_env.sh \
    # Remove debugging symbols from embedded node (extra 7MB)
    && strip -s `which node` \
    # Tests consume ~80MB disc space
    && rm -fr ${EMSDK}/upstream/emscripten/tests \
    # Fastcomp is not supported
    && rm -fr ${EMSDK}/upstream/fastcomp \
    # strip out symbols from clang (~extra 50MB disc space)
    && find ${EMSDK}/upstream/bin -type f -exec strip -s {} + || true \
    && echo "## Done"

FROM node:18 as frontend_build
WORKDIR /app
COPY frontend .
RUN yarn install && yarn build

FROM ubuntu:jammy AS stage_deploy

WORKDIR /app

COPY --from=stage_emsdk_build /emsdk /emsdk
COPY backend /app
COPY --from=frontend_build /app/build /app/dist

EXPOSE 26546

# Fallback in case Emscripten isn't activated.
# This will let use tools offered by this image inside other Docker images
# (sub-stages) or with custom / no entrypoint
ENV EMSDK=/emsdk \
    EM_CONFIG=/emsdk/.emscripten \
    EMSDK_NODE=/emsdk/node/14.18.2_64bit/bin/node \
    PATH="/emsdk:/emsdk/upstream/emscripten:/emsdk/upstream/bin:/emsdk/node/14.18.2_64bit/bin:${PATH}"

RUN echo "## Create emscripten user (1000:1000)" \
    && groupadd --gid 1000 emscripten \
    && useradd --uid 1000 --gid emscripten --shell /bin/bash --create-home emscripten \
    && echo "umask 0000" >> /etc/bash.bashrc \
    && echo ". /emsdk/emsdk_env.sh" >> /etc/bash.bashrc \
    && echo "## Done"


RUN echo "## Update and install packages" \
    && apt-get -qq -y update \
    # Somewhere in here apt sets up tzdata which asks for your time zone and blocks
    # waiting for the answer which you can't give as docker build doesn't read from
    # the terninal. The env vars set here avoid the interactive prompt and set the TZ.
    && DEBIAN_FRONTEND="noninteractive" TZ="Asia/Shanghai" apt-get -qq install -y --no-install-recommends \
        sudo \
        libxml2 \
        ca-certificates \
        python3 \
        python3-pip \
        wget \
        curl \
        zip \
        unzip \
        git \
        git-lfs \
        ssh-client \
        build-essential \
        make \
        ant \
        libidn11 \
        cmake \
    # Standard Cleanup on Debian images
    && apt-get -y clean \
    && apt-get -y autoclean \
    && apt-get -y autoremove \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/cache/debconf/*-old \
    && rm -rf /usr/share/doc/* \
    && rm -rf /usr/share/man/?? \
    && rm -rf /usr/share/man/??_* \
    && echo "## Done"


RUN pip install -r requirements.txt

CMD python main.py
