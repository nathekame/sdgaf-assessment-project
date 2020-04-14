
const express = require('express');

const router = express.Router();

const estimatorRoute = require('./estimatorRoutes');


router.post('/:format?', estimatorRoute.estimatorPost);

router.get('/logs', estimatorRoute.estimatorGetLogs);


module.exports = router;
