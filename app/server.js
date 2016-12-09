'use strict';

const express    = require('express');
const bodyParser = require('body-parser');

// App
const app = express();
const port = process.env.PORT || 3000;
app.set('port', port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/product', (req, res) => {
});

app.get('/api/product/:product_id', (req, res) => {
});

app.post('/api/product', (req, res) => {
});

app.get('/', (req, res) => {
  res.send('Hello World!\n')
});

app.listen(app.get('port'), (err) => {
  console.log(`Server running on http://localhost:${app.get('port')}`);
});
