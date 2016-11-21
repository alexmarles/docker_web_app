'use strict';

const express = require('express');

// Constants
const port = 3000;

// App
const app = express();
app.set('port', port);

app.get('/', (req, res) => {
  res.send('Hello World!\n')
});

app.get('/:nombre', (req, res) => {
  res.send(`Hola ${req.params.nombre}!`);
});


app.listen(app.get('port'), (err) => {
  console.log(`Server running on http://localhost:${app.get('port')}`);
});
