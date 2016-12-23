'use strict';

// App imports
const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const app        = express();
const api        = require('./routes/api');

// App config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

module.exports = app;
