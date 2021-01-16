const express = require('express');
const router = express.Router();

// import controller
const { addData, getFace, getUser, delUser, getTest, run } = require('../controllers/curdController');

router.post('/addData', function (req, res, next) {
  // console.log("hello");
  next()
}, addData);
router.get('/getFace', getFace);
router.get('/getUser/:id', getUser);
router.get('/test', getTest);
router.get('/delete/:id', delUser)
router.get('/run', run);

module.exports = router;
