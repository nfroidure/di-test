import initArgs from '../services/args';
import { service } from 'knifecycle';

export interface Command {
  (): Promise<void>;
}

export default service(initCommand, 'command', ['runner']);
async function initCommand({ runner }: { runner: Command }) {
  await runner();
}
