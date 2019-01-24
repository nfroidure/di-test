import fs from 'fs';
import initDB from '../services/db';
import initFTP from '../services/ftp';
import initLog, { Logger } from '../services/log';
import initArgs, { Args } from '../services/args';
import { autoService } from 'knifecycle';
import { Client as ClientPG } from 'pg';
import Client from 'ftp';

export default autoService(initInsertRows);

async function initInsertRows({
  db,
  ftp,
  log,
  args,
}: {
  db: ClientPG;
  ftp: Client;
  log: Logger;
  args: Args;
}) {

  return async function insertRows() {
    log('Rebuild from scratch.');
    await db.query(`DROP TABLE IF EXISTS rows`);
    await db.query(`
    CREATE TABLE rows (
      id int PRIMARY KEY,
      username text NOT NULL,
      firstname text DEFAULT NULL,
      lastname text DEFAULT NULL,
      cite text DEFAULT NULL
    );
    `);

    await Promise.all(
      args.path.map(async path => {
        log('Reading file: ', path);
        const content = fs.readFileSync(path, 'utf8');
        const rows = content
          .split(/\r?\n/g)
          .map(s =>
            s
              .trim()
              .split(/,/g)
              .map(s => s.trim())
              .filter(s => s),
          )
          .filter(x => x.length);

        return Promise.all(
          rows.map(async row => {
            log('Putting row: ', row);

            await db.query(
              `INSERT INTO rows (id, username, firstname, lastname, cite) VALUES ($1, $2, $3, $4, $5)`,
              row,
            );
          }),
        );
      }),
    );

    db.end();
    ftp.end();
  };
}
