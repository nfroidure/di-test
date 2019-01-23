import path from 'path';
import initFTP from '../services/ftp';
import initArgs from '../services/args';

export default async function initInsertRows() {
  const ftp = await initFTP();
  const args = await initArgs();

  return async function insertRows() {
    await Promise.all(
      args.path.map(
        aPath =>
          new Promise((resolve, reject) => {
            ftp.put(aPath, path.basename(aPath), err => {
              if (err) {
                reject(err);
                return;
              }
              resolve();
            });
          }),
      ),
    );

    ftp.end();
  };
}
