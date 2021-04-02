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
  if (stdinStartPtr < stdinEndPtr) {
    return stdinBuffer[stdinStartPtr++];
  } else {
    ctx.postMessage({
      type: "waitInput",
    });
    Atomics.wait(stdinBuffer, stdinBuffer.length, 0);
  }
};

const stdout = (e: number) => {
  ctx.postMessage({
    type: "stdout",
    data: e,
  });
};

const stderr = () => {
  return null;
};

ctx.onmessage = (ev) => {
  const msg = ev.data as IMsg;
  switch (msg.type) {
    case "run": {
      Module(msg.data, stdin, stdout, stderr).then((instance) => {
        console.log(instance);
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
      stdinBuffer[stdinEndPtr] = 0;
      stdinEndPtr--;
      break;
    }
  }
};

export default ctx;
