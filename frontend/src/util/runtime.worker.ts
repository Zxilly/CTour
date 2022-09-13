/* eslint-disable-next-line no-restricted-globals */
import {runWithModule} from "./wasm";

const ctx: Worker = self as any;

// Post data to parent thread
// ctx.postMessage({ foo: "foo" });

interface IMsg {
  type: string;
  data: any;
}

let mem: SharedArrayBuffer;
let inputLock: Int32Array;


const stdin = () => {
  if (stdinStartPtr >= stdinEndPtr) {
    Atomics.wait(inputLock, inputLock.length - 1, 0);
    stdinEndPtr = Atomics.load(inputLock, inputLock.length - 2);
    return inputLock[stdinStartPtr++];
  } else {
    return inputLock[stdinStartPtr++];
  }
};

const stdout = (e: any) => {
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
    type: "exit",
    data: exitCode,
  });
};

ctx.onmessage = (ev) => {
  const msg = ev.data as IMsg;
  switch (msg.type) {
    case "run": {
      const url = msg.data.url;
      runWithModule({

      })
      break;
    }
    case "memInit": {
      mem = msg.data;
      inputLock = new Int32Array(mem);
      break;
    }
  }
};

export default ctx;
