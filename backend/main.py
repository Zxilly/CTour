import os
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

    result = os.system(
        f'{emcc} {file_path} -s WASM=1 -s EXIT_RUNTIME=1 -o {output_path}')
    success = True if result == 0 else False

    return {"success": success, "wasm_id": random_name}


mime_type = {
    'js': 'application/javascript',
    'wasm': 'application/wasm'
}

read_type = {
    'js': 'r+',
    'wasm': 'rb'
}


@app.get('/compiled/{wasm_id}.{file_type}')
async def emcc_compiled(
        wasm_id: int = Path(...),
        file_type: str = Path(...)
):
    if file_type not in ['js', 'wasm']:
        raise HTTPException(400, 'Type Error.')

    if len(str(wasm_id)) != 16:
        raise HTTPException(400, 'Length not meet.')

    out = f'/tmp/{wasm_id}.{file_type}'

    try:
        with open(out, read_type[file_type]) as f:
            content = f.read()
    except FileNotFoundError:
        raise HTTPException(404, 'Not Found')

    return Response(content=content, media_type=mime_type[file_type])


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0')
