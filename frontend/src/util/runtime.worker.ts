import Module from "./wasm";

/* eslint-disable-next-line no-restricted-globals */
const ctx: Worker = self as any;

// Post data to parent thread
// ctx.postMessage({ foo: "foo" });

interface IMsg {
  type: string;
  data: any;
}

let mem: SharedArrayBuffer;
let stdinBuffer: Int32Array;
let stdinStartPtr = 0;
let stdinEndPtr = 0;

const stdin = () => {
  if (stdinStartPtr >= stdinEndPtr) {
    Atomics.wait(stdinBuffer, stdinBuffer.length-1, 0);
    stdinEndPtr=Atomics.load(stdinBuffer,stdinBuffer.length-2);
    return stdinBuffer[stdinStartPtr++];
  } else {
    return stdinBuffer[stdinStartPtr++];
  }
};

const stdout = (e: number) => {
  ctx.postMessage({
    type: "stdout",
    data: e,
  });
};

const stderr = () => {
  return null; //TODO: Display stderr in another color.
};

const onExit = (exitCode: number) => {
  ctx.postMessage({
    type:"exit",
    data:exitCode
  })
}

ctx.onmessage = (ev) => {
  const msg = ev.data as IMsg;
  switch (msg.type) {
    case "run": {
      Module(msg.data, stdin, stdout, stderr,onExit).then((instance) => {
        ctx.postMessage({
          type:"inited",
        })
        instance.callMain();
      });
      break;
    }
    case "memInit": {
      mem = msg.data;
      stdinBuffer = new Int32Array(mem);
      break;
    }
    case "delete": {
      stdinEndPtr=Atomics.load(stdinBuffer,stdinBuffer.length-2);
      break;
    }
  }
};

export default ctx;
