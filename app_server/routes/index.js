var express = require('express');
var router = express.Router();

var homepaqe = require('../controllers/main');



/* GET home page. */
router.get('/', homepaqe.index);

module.exports = router;
