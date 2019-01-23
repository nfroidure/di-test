export interface Timer {
  (): number;
}

export default async function initTime() {
  return Date.now.bind(Date);
}
