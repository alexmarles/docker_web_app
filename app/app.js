const express = require('express');
const app = express();
const port = 3000;

app.set('port', port);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(app.get('port'), (err) => {
  console.log(`Server running on port ${app.get('port')}`)
});
