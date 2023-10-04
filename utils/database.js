const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kinguser',
  database: 'db-mgt',
  port: 3306,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL server');
    connection.release();
  }
});

module.exports = pool.promise();
