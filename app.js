
const express = require('express');
const bodyParser = require('body-parser');
const xmlMiddleware = require('xml-express-middleware').xml;
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
// const _ = require('lodash');
const routes = require('./src/routes/api');


const app = express();

const PORT = process.env.PORT || 6000;

const logStream = fs.createWriteStream(path.join(__dirname, 'covid19estimator.log'));


const checkResTime = (data) => {
  const d = data;
  if (d < 10) {
    // console.log("it is less than 10 ooo "+d);
    const y = Math.trunc(d);
    const x = `0${y}`;
    return x;
  }
  return d;
};

const dMorgan = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    checkResTime(tokens['response-time'](req, res)), 'ms'
  ].join(' ');
}, { stream: logStream });

// app.use(morgan(':method  :url  :status  :response-time[0] ms', { stream: logStream }));

app.use(dMorgan);


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
