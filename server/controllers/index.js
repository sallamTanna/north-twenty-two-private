const express = require('express');
const router = express.Router();
const getAllWatches = require('./getAllWatches.js')
const displayWatchPage = require('./displayWatchPage.js')
const getAllPosts = require('./getAllPosts.js')
const getAllWristbands = require('./getAllWristbands.js')

router.get('/getAllWatches', getAllWatches.getAllWatches)
router.post('/displayWatchPage', displayWatchPage.displayWatchPage)
router.get('/getAllPosts', getAllPosts.getAllPosts)
router.get('/getAllWristbands', getAllWristbands.getAllWristbands)

module.exports = router;
