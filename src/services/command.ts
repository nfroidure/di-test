import initArgs from '../services/args';

export interface Command {
  (): Promise<void>;
}

export default async function initCommand() {
  const args = await initArgs();
  const initCommand = require('../commands/' + args.command).default;

  return <Command>initCommand();
}
