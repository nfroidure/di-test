import argv from 'argv';
import { service } from 'knifecycle';

export type Args = {
  type: string;
  path: string[];
  command: string;
};

export default service(initArgs, 'args');

async function initArgs() {
  argv.option([
    {
      name: 'type',
      type: 'csv,json',
    },
    {
      name: 'path',
      short: 'p',
      type: 'list,string',
    },
    {
      name: 'command',
      short: 'c',
      type: 'string',
    },
  ]);
  const args = <Args>argv.run().options;

  return args;
}
