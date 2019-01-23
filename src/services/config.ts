import { ConnectionConfig } from 'pg';
import Client from 'ftp';

export interface Config {
  db: ConnectionConfig;
  ftp: Client.Options;
}

export default async function initCommand() {
  const config = <Config>require('../configs/' + process.env.NODE_ENV).default;

  return config;
}
