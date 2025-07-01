const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'metro.proxy.rlwy.net',
  user: 'root',
  password: 'LqxFEoeqnRgsGCtpSGyMLilnjGndFszA',
  database: 'railway',
  port: 49532
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the Railway database:', err);
    return;
  }
  console.log('Connected to the Railway database');
});

module.exports = db;
