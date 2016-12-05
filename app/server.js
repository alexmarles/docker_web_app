'use strict';

const express    = require('express');
const bodyParser = require('body-parser');

// App
const app = express();
const port = process.env.PORT || 3000;
app.set('port', port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!\n')
});

app.get('/:nombre', (req, res) => {
  res.send(`Hola ${req.params.nombre}!`);
});


app.listen(app.get('port'), (err) => {
  console.log(`Server running on http://localhost:${app.get('port')}`);
});
