import pg from 'pg';
import initConfig, { Config } from './config';
import { autoService, name } from 'knifecycle';

export default name('db', autoService(initDB));

async function initDB({ config } : {
  config: Config
}) {
  const client = new pg.Client(config.db);

  await client.connect();

  return client;
}
