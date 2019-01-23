import path from 'path';
import { service, inject } from 'knifecycle';
import { Args } from './args';

export default service(initAutoload, '$autoload', [], { singleton: true });

async function initAutoload() {
  const initArgs = (await $autoload('args')).initializer;
  const args = <Args>await initArgs();

  return $autoload;

  async function $autoload(injectedName : string) {
    // Try to pickup the initializer in the services folder
    try {
      const initializer = require('./' + injectedName).default;

      return {
        name: injectedName,
        path: path.join(__dirname, injectedName),
        initializer:
          'command' === injectedName
            ? inject(['runner>' + args.command], initializer)
            : initializer,
      };
    } catch (err) {
      // Last chance with commands
      const initializer = require('../commands/' + injectedName).default;

      return {
        name: injectedName,
        path: path.join(__dirname, '..', 'commands', injectedName),
        initializer,
      };
    }
  }
}
