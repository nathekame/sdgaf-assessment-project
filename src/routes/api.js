
const express = require('express');

const router = express.Router();

const estimatorRoute = require('./estimatorRoutes');


router.get('/', (req, res) => {
  res.send('WELCOME TO SDGAF ESTIMATOR API');
});

router.post('/api/v1/on-covid-19/:format', estimatorRoute.estimatorPost);

router.post('/api/v1/on-covid-19/json', estimatorRoute.estimatorPostJSON);

router.post('/api/v1/on-covid-19/xml', estimatorRoute.estimatorPostXML);

router.get('/api/v1/on-covid-19/logs', estimatorRoute.estimatorGetLogs);


module.exports = router;
