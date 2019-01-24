import Client from 'ftp';
import initConfig, { Config } from './config';
import { provider } from 'knifecycle';

export default provider(initFTP, 'ftp', ['config']);

async function initFTP({ config }: { config: Config }) {
  const ftp = new Client();
  const connectionPromise = new Promise((resolve, reject) => {
    ftp.on('ready', resolve);
    ftp.on('error', reject);
  });

  ftp.connect(config.ftp);

  await connectionPromise;

  return {
    service: ftp,
    dispose: async () => ftp.end(),
    fatalErrorPromise: <Promise<void>>new Promise((resolve, reject) => {
      ftp.on('error', reject);
    }),
  };
}
