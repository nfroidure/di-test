import { service } from "knifecycle";

export interface Timer {
  (): number;
}

export default service(initTime, 'time');

async function initTime() {
  return Date.now.bind(Date);
}
