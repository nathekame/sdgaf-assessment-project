const fs = require('fs');
const estimator = require('./estimator');


const estimatorPost = async (req, res) => {
  const dataToBeReturned = await estimator(req.body);
  const reqFormat = req.params.format;

  if (reqFormat === 'json') {
    res.setHeader('Content-Type', 'application/json');
    res.json(dataToBeReturned);
  } else if (reqFormat === 'xml') {
    res.set('Content-Type', 'application/xml');
    res.xml(dataToBeReturned);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.json(dataToBeReturned);
  }
};


const estimatorGetLogs = async (req, res) => {
  fs.stat('./covid19estimator.log', (err, stats) => {
    if (err) {
      res.sendStatus(404);
    }
    if (stats.isFile) {
      const readStream = fs.createReadStream('./covid19estimator.log');
      res.type('text/plain');
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
  estimatorPost,
  estimatorGetLogs
};
