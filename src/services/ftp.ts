import Client from 'ftp';
import initConfig, { Config } from './config';
import { service } from 'knifecycle';

export default service(initFTP, 'ftp', ['config']);

async function initFTP({ config } : {
  config: Config,
}) {
  const ftp = new Client();
  const connectionPromise = new Promise((resolve, reject) => {
    ftp.on('ready', resolve);
    ftp.on('error', reject);
  });

  ftp.connect(config.ftp);

  await connectionPromise;

  return ftp;
}
