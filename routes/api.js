'use strict'

const express = require('express');
const router = express.Router();
const estimatorRoute = require('./estimatorRoutes');


router.post('/api/v1/on-covid-19/json', estimatorRoute.estimatorPostJSON);

router.post('/api/v1/on-covid-19/xml', estimatorRoute.estimatorPostXML);

router.get('/api/v1/on-covid-19/logs', estimatorRoute.estimatorGetLogs);



module.exports = router;
