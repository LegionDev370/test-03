import { parentPort } from "worker_threads";

parentPort.on("message", () => {
  for (let index = 0; index < 1000000000000000; index++) {}
  parentPort.postMessage("done");
});
