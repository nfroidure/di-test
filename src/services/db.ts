import pg from 'pg';
import initConfig, { Config } from './config';
import { autoProvider, name } from 'knifecycle';

export default name('db', autoProvider(initDB));

async function initDB({ config }: { config: Config }) {
  const client = new pg.Client(config.db);

  await client.connect();

  return {
    service: client,
    dispose: async () => client.end(),
    fatalErrorPromise: <Promise<void>> new Promise((resolve, reject) => {
      client.on('error', reject);
    }),
  };
}
