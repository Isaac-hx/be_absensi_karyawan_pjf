import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host:  'localhost',
  user:  'root',
  password:  'saydimas78',
  database:  'db_absensi',
  port:3306,
  connectionLimit: 10,
});
