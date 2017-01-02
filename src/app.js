'use strict';

import express    from 'express';
import bodyParser from 'body-parser';
import mongoose   from 'mongoose';
import morgan     from 'morgan';
import api        from './routes/api';

const app = express();

// App Config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', api);

export default app;
