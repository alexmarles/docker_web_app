'use strict';

import express    from 'express';
import bodyParser from 'body-parser';
import mongoose   from 'mongoose';
import api        from './routes/api';

const app = express();

// App Config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

export default app;
