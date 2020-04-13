
import express from 'express';
import bodyParser from 'body-parser';
// import xmlMiddleware from 'xml-express-middleware';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import routes from './src/routes/api';


// const express = require('express');
// const bodyParser = require('body-parser');
const xmlMiddleware = require('xml-express-middleware').xml;
// const fs = require('fs');
// const morgan = require('morgan');
// const path = require('path');
// const routes = require('./src/routes/api');

const app = express();

const PORT = process.env.PORT || 6000;

const logStream = fs.createWriteStream(path.join(__dirname, 'covid19estimator.log'));

app.use(morgan(':method  :url  :status  :response-time ms', { stream: logStream }));

app.use(bodyParser.json());
app.use(xmlMiddleware());

app.use('/', routes);


app.listen(PORT);
