import Module from "./wasm";

/* eslint-disable-next-line no-restricted-globals */
const ctx: Worker = self as any;

// Post data to parent thread
// ctx.postMessage({ foo: "foo" });

interface IMsg {
  type: string;
  data: any;
}

let stdinBuffer: string;
let stdoutBuffer: string;
let stderrBuffer: string;

const stdin = () => {
  return null;
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
        instance.callMain()
      });
    }
  }
};

export default ctx;
