'use strict';

const mongoose = require('mongoose');
const config   = require('./config');
const app      = require('./app');

// DB setup
mongoose.connect(config.db, (err, res) => {
  if (err) return console.log(`Error establishing connection to the database: ${err}`);
  
  console.log('Established connection to the database');
  app.listen(config.port, (err) => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
});
