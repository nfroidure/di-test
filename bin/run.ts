import initCommand from '../src/services/command';

run();

async function run() {
  try {
    const command = await initCommand();

    await command();
  } catch (err) {
    console.error('Error:', err.stack);
    process.exit(1);
  }
}
