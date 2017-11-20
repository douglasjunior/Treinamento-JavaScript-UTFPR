import express from 'express';
import cors from 'cors';
import expressValidator from 'express-validator';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { customValidators } from './utils/Validator';
import loadRoutes from './routes/';

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator({ customValidators: customValidators }));
app.use(express.static(path.join(__dirname, '../public')));

loadRoutes(app, '/api');

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500)
        .json({
            message: err.message,
            error: req.app.get('env') === 'development' ? err : {}
        });
});

module.exports = app;
