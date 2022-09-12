import os
import subprocess
import uuid

import uvicorn
from fastapi import FastAPI, Path, Body
from starlette.exceptions import HTTPException
from starlette.responses import Response, FileResponse

app = FastAPI()


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

    emcc = "emcc"

    env = os.environ.copy()
    # emccenv = {
    #     "EMSDK": "/root/emsdk",
    #     "EM_CONFIG": "/root/emsdk/.emscripten",
    #     "EM_CACHE": "/root/emsdk/upstream/emscripten/cache",
    #     "EMSDK_NODE": "/root/emsdk/node/14.15.5_64bit/bin/node",
    # }

    process = subprocess.Popen(
        [emcc, file_path, "-o", output_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, env=env
    )

    # emcc main.c -s FORCE_FILESYSTEM=1 -s EXPORT_ALL=1 -s STRICT=1 -s IGNORE_MISSING_MAIN=0 -s WASM_ASYNC_COMPILATION=0 -s MODULARIZE=1 -s EXPORT_ES6=1 -s EXIT_RUNTIME=1 -s ENVIRONMENT=web -o main.js

    try:
        return_code = process.wait(timeout=15)
        print(return_code)

        if return_code != 0:
            error = process.communicate()[1].decode()
        else:
            success = True

    except subprocess.TimeoutExpired:
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

    if not os.path.exists(out):
        raise HTTPException(404, 'File not found.')
    else:
        return FileResponse(out, media_type='application/wasm')


@app.get('/{path:path}')
async def root(path: str):
    print("triggerd")
    path = "./dist/" + path
    if os.path.isfile(path):
        return FileResponse(path)
    else:
        return FileResponse("./dist/index.html")


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=26546)
