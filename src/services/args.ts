import argv from 'argv';

export type Args = {
  type: string;
  path: string[];
  command: string;
};

export default async function initArgs() {
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
