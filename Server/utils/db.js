import mysql from 'mysql2';

const db = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'enzzomysql',
  database:'employeems'
});

export { db };