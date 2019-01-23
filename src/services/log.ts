export interface Logger {
  (...args: any[]): void;
}

export default async function initLog() {
  return console.log.bind(console);
}
