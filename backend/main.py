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

emcc = '/mnt/e/Project/CS_Project/2021/CTour/emsdk/upstream/emscripten/emcc'


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

    process = subprocess.Popen([emcc, file_path, "-s", "WASM=1", "-o", output_path])
    try:
        returnCode = process.wait(timeout=15)
        if returnCode != 0:
            error = process.communicate()[1].decode()
        else:
            success = True

    except subprocess.TimeoutExpired:
        # print("timeout")
        process.terminate()
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
    uvicorn.run('main:app', host='0.0.0.0')
