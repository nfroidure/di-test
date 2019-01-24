import path from 'path';
import Client from 'ftp';
import initArgs, { Args } from '../services/args';
import { autoService } from 'knifecycle';

export default autoService(initPutToFTP)

async function initPutToFTP({
  args,
  ftp,
}: {
  args: Args;
  ftp: Client;
}) {
  return async function putToFTP() {
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
  };
}
