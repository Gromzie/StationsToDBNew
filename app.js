const express = require('express');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
const port = 3000;

// Skapa en anslutning till MySQL-databasen
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'simsjs'
});

// Anslut till databasen
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Läs in JSON-filen och lägg till varje post i databasen
fs.readFile('Filtered_Swedish_Nobil_with_Coordinates_and_Manufacturer.json', 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading the file:', err);
    return;
  }

  const jsonData = JSON.parse(data);
  jsonData.chargerstations.forEach(station => {
    const query = 'INSERT INTO stations SET ?';
    db.query(query, station, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Added station ${station.name}`);
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});