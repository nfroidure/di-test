import initDB from '../services/db';
import { Client } from 'pg';
import { autoService } from 'knifecycle';

export default autoService(initPrintRows)

async function initPrintRows({ db }: { db: Client }) {
  return async function printRows() {
    const { rows } = await db.query(`SELECT * FROM rows`);

    rows.forEach(row => {
      console.log(row);
    });

    db.end();
  };
}
