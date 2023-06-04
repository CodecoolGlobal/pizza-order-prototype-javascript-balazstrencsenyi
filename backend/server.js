const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const FE_FS_PATH = path.join(__dirname, '..', 'frontend');

app.use(express.static(FE_FS_PATH));
app.use(express.json());

 /*fs.writeFile('coffees.json', JSON.stringify(data, replacer, 2), (err) => {
  if (err) {
    console.error(err);
    res.status(500).send('Error saving profile data');
  } else {
    res.sendStatus(200);
  }
}); */

/* app.delete('/deleteCoffees', (req, res) => {
  fs.unlink('coffees.json', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting profile');
    } else {
      res.sendStatus(200);
    }
  });
}); */
