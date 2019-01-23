import initDB from '../services/db';

export default async function initPrintRows() {
  const db = await initDB();

  return async function printRows() {
    const { rows } = await db.query(`SELECT * FROM rows`);

    rows.forEach(row => {
      console.log(row)
    });

    db.end();
  }
}
