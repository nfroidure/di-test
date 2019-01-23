import Client from 'ftp';
import initConfig from './config';

export default async function initFTP() {
  const config = await initConfig();
  const ftp = new Client();
  const connectionPromise = new Promise((resolve, reject) => {
    ftp.on('ready', resolve);
    ftp.on('error', reject);
  });

  ftp.connect(config.ftp);

  await connectionPromise;

  return ftp;
}
