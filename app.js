
import routes from './routes/api';

const express = require('express');
const bodyParser = require('body-parser');

// const dRoutes = require('./routes/api');
const xmlMiddleware = require('xml-express-middleware').xml;

const fs = require('fs');
const morgan = require('morgan');
const path = require('path');


const app = express();


const logStream = fs.createWriteStream(path.join(__dirname, 'covid19estimator.log'));

app.use(morgan(':method  :url  :status  :response-time ms', { stream: logStream }));

app.use(bodyParser.json());
app.use(xmlMiddleware());

app.use('/', routes);


app.listen(5000);
