'use strict';

import mongoose from 'mongoose';
import config from './config';
import app from './app';

// DB setup
mongoose.connect(config.db, (err, res) => {
  if (err) return console.log(`Error establishing connection to the database: ${err}`);
  
  console.log('Established connection to the database');
  app.listen(config.port, (err) => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
});
