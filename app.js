
const express = require('express');
const bodyParser = require('body-parser');
const xmlMiddleware = require('xml-express-middleware').xml;
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const routes = require('./src/routes/api');

const app = express();

const PORT = process.env.PORT || 6000;

const logStream = fs.createWriteStream(path.join(__dirname, 'covid19estimator.log'));

app.use(morgan(':method\t\t:url\t\t:status\t\t:response-time ms\n', { stream: logStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(xmlMiddleware());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
  next();
});

app.use('/api/v1/on-covid-19', routes);


app.listen(PORT);
