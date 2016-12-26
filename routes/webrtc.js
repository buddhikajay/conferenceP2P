/**
 * Created by buddhikajay on 8/5/16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('webrtc.jade', { title: 'Express' });
});

module.exports = router;
