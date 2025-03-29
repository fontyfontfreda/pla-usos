require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Servir l'Angular app en producció
app.use(express.static(path.join(__dirname, '../dist/adreces-app')));

// Configuració MariaDB
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Error connectant a MariaDB:', err);
    return;
  }
  console.log('✅ Connectat a MariaDB!');
});

// Endpoint per obtenir adreces
app.get('/api/adreces', (req, res) => {
  db.query('SELECT * FROM adreca', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Servir Angular en producció
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/adreces-app/index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend escoltant al port ${PORT}`));
