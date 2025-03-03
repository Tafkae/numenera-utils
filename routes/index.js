const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set({
    "status": 200,
    "statusText": "OK",
    "message": "Done",
  });
  res.render('index', { title: 'Numenera Utils' });
});



module.exports = router;
