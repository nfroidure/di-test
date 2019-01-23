import fs from 'fs';
import initDB from '../services/db';
import initFTP from '../services/ftp';
import initLog from '../services/log';
import initArgs from '../services/args';

export default async function initInsertRows() {
  const db = await initDB();
  const ftp = await initFTP();
  const log = await initLog();
  const args = await initArgs();

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
  }
}
