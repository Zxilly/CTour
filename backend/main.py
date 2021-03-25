import os
import random
import string

import uvicorn
from fastapi import FastAPI, Path, Body
from fastapi.middleware.cors import CORSMiddleware

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
def emcc_compile(
        code: str = Body(..., embed=True)
):
    random_name = "".join(random.sample(string.ascii_letters + string.digits, 8))
    print(random_name)
    file_path = f'/tmp/{random_name}.c'
    output_path = f'/tmp/{random_name}.js'

    with open(file_path, 'w+') as f:
        f.write(code)

    result = os.system(
        f'{emcc} {file_path} -s WASM=1 -O2 -o {output_path}')
    success = True if result == 0 else False

    return {"success": success, "wasmId": random_name}


@app.get('/compiled/{wasmId}')
def emcc_compiled(wasmId: int = Path(...)):
    out_js = f'/tmp/{wasmId}.js'
    out_wasm = f'/tmp/{wasmId}.wasm'
    with open()


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0')
