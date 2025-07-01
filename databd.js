const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'turntable.proxy.rlwy.net',
  user: 'root',
  password: 'UvdUwRPEkbkuUKLzmeJqiRMDPYSBKzPa',
  database: 'railway',
  port: 20992
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the Railway database:', err);
    return;
  }
  console.log('Connected to the Railway database');
});

module.exports = db;
