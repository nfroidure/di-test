import { service } from "knifecycle";

export interface Logger {
  (...args: any[]): void;
}

export default service(initLog, 'log');

async function initLog() {
  return console.log.bind(console);
}
