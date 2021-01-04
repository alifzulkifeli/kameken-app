const express = require('express');
const router = express.Router();

// import controller
const { addData, getFace, getUser } = require('../controllers/curdController');

router.post('/addData', function (req, res, next) {
  // console.log("hello");
  next()
}, addData);
router.get('/getFace', getFace);
router.get('/getUser/:id', getUser);


module.exports = router;