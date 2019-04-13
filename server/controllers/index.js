const express = require('express');
const router = express.Router();
const getAllWatches = require('./getAllWatches.js')

router.get('/getAllWatches', getAllWatches.getAllWatches)

module.exports = router;
