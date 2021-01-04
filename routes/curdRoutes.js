const express = require('express');
const router = express.Router();

// import controller
const { addData, getFace, getUser, getTest } = require('../controllers/curdController');

router.post('/addData', function (req, res, next) {
  // console.log("hello");
  next()
}, addData);
router.get('/getFace', getFace);
router.get('/getUser/:id', getUser);
router.get('/test', getTest);


module.exports = router;