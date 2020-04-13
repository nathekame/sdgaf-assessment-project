import fs from 'fs';
import covid19ImpactEstimator from '../estimator';

// const fs = require('fs');

// const estimator = require('./estimator');
// const covid19ImpactEstimator = require('../estimator');

const estimatorPostJSON = async (req, res) => {
  const dataToBeReturned = covid19ImpactEstimator(req.body);
  res.set('Content-Type', 'application/json');
  res.send(dataToBeReturned);
};

const estimatorPostXML = async (req, res) => {
  const dataToBeReturned = covid19ImpactEstimator(req.body);
  res.set('Content-Type', 'application/xml');
  res.xml(dataToBeReturned);
};


const estimatorGetLogs = async (req, res) => {
  fs.stat('./covid19estimator.log', (err, stats) => {
    if (err) {
      res.sendStatus(404);
    }
    if (stats.isFile) {
      const readStream = fs.createReadStream('./covid19estimator.log');
      readStream.pipe(res);
      readStream.on('error', () => {
        res.sendStatus(500);
      });
      res.on('error', () => {
        res.sendStatus(500);
      });
    } else {
      res.sendStatus(404);
    }
  });
};

module.exports = {
  estimatorPostJSON,
  estimatorPostXML,
  estimatorGetLogs
};
