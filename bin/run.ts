import initAutoload from '../src/services/_autoload';
import Knifecycle, { constant } from 'knifecycle';

run();

async function run() {
  try {
    const $ = new Knifecycle();

    $.register(initAutoload);
    $.register(constant('ENV', process.env));

    const { $destroy } = await $.run(['command', '$destroy']);

    await $destroy();
  } catch (err) {
    console.error('Error:', err.stack);
    process.exit(1);
  }
}
