
const express = require('express');

const router = express.Router();

const estimatorRoute = require('./estimatorRoutes');


router.get('/', (req, res) => {
  res.send('WELCOME TO SDGAF ESTIMATOR API');
});

router.post('/:format?', estimatorRoute.estimatorPost);

// router.post('/json', estimatorRoute.estimatorPostJSON);

// router.post('/xml', estimatorRoute.estimatorPostXML);

router.get('/logs', estimatorRoute.estimatorGetLogs);


module.exports = router;
