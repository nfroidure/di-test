import { ConnectionConfig } from 'pg';
import Client from 'ftp';
import { service, autoName } from 'knifecycle';

export interface Config {
  db: ConnectionConfig;
  ftp: Client.Options;
}

export default service(autoName(initConfig))

async function initConfig() {
  const config = <Config>require('../configs/' + process.env.NODE_ENV).default;

  return config;
}
