import os
import subprocess
import uuid

import uvicorn
from fastapi import FastAPI, Path, Body
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException
from starlette.responses import Response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# emcc = '/home/zxilly/wasi-sdk-12.0/bin/clang'


@app.post('/compile')
async def emcc_compile(
        code: str = Body(..., embed=True)
):
    random_name = str(uuid.uuid4().int >> 64)[0:16]
    # print(random_name)
    file_path = f'/tmp/{random_name}.c'
    output_path = f'/tmp/{random_name}.js'

    with open(file_path, 'w+') as f:
        f.write(code)

    error = ""
    success = False

    # process = subprocess.Popen(
    #     ["emcc", "--sysroot", "/home/zxilly/wasi-sdk-12.0/share/wasi-sysroot", file_path, "-o", output_path],
    #     stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    emcc = "/root/emsdk/upstream/emscripten/emcc"

    env = os.environ.copy()
    emccenv = {
        "EMSDK": "/root/emsdk",
        "EM_CONFIG": "/root/emsdk/.emscripten",
        "EM_CACHE": "/root/emsdk/upstream/emscripten/cache",
        "EMSDK_NODE": "/root/emsdk/node/14.15.5_64bit/bin/node",
    }

    process = subprocess.Popen(
        [emcc, file_path, "-o", output_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, env=dict(env, **emccenv)
    )

    # emcc main.c -s FORCE_FILESYSTEM=1 -s EXPORT_ALL=1 -s STRICT=1 -s IGNORE_MISSING_MAIN=0 -s WASM_ASYNC_COMPILATION=0 -s MODULARIZE=1 -s EXPORT_ES6=1 -s EXIT_RUNTIME=1 -s ENVIRONMENT=web -o main.js

    try:
        returnCode = process.wait(timeout=15)
        print(returnCode)

        if returnCode != 0:
            error = process.communicate()[1].decode()
        else:
            success = True

    except subprocess.TimeoutExpired:
        # print("timeout")
        process.terminate()
        error = 'Compile Timeout'

    os.remove(file_path)
    os.remove(output_path)

    return {"success": success, "wasm_id": random_name, "error": error}


@app.get('/compiled/{wasm_id}.wasm')
async def emcc_compiled(
        wasm_id: int = Path(...)
):
    if len(str(wasm_id)) != 16:
        raise HTTPException(400, 'Length not meet.')

    out = f'/tmp/{wasm_id}.wasm'

    try:
        with open(out, 'rb') as f:
            content = f.read()

        os.remove(out)
    except FileNotFoundError:
        raise HTTPException(404, 'Not Found')

    return Response(content=content, media_type='application/wasm')


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=26546, debug=True)
