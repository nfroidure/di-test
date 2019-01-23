import pg from 'pg';
import initConfig from './config';

export default async function initDB() {
  const config = await initConfig();
  const client = new pg.Client(config.db);

  await client.connect();

  return client;
}
