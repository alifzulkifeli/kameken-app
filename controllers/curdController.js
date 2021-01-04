const multer = require('multer');
const path = require('path');
var fs = require('fs');
const User = require('../models/curd');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, "input" + path.extname(file.originalname));
  }
})


exports.addData = (req, res) => {
  var upload = multer({ storage: storage }).single("image")

  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(400).send("Something went wrong!");
    }
    const data = req.body.data ? JSON.parse(req.body.data) : {}
    console.log(data);

    function check() {
      setTimeout(() => {
        fs.readFile('/Users/al/Documents/kameken-app/data.txt', 'utf8', function (err, facedata) {
          if (err) {
            check();
          } else {
            saveToDB(facedata.toString())
          }
        });
      }, 1000)
    }

    const saveToDB = (args) => {
      const image = JSON.parse(args)
      const user = new User({ face: image.face, data, image: image.data });
      fs.unlink("/Users/al/Documents/kameken-app/data.txt", (err) => {
        if (err) {
          console.error(err)
        }
        console.log("file deleted");
      })
      console.log("trying to save");
      user.save((err, user) => {
        if (err) {
          console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
          return res.status(401).json({
            error: 'Error saving user in database. Try signup again'
          });
        }
        console.log("saved");
        return res.json({
          user
        });

      });
    }
    check();


  });


};


exports.getFace = async (req, res) => {
  const data = await User.find({}, "_id image")
  return res.json({
    data
  });
};

exports.getUser = async (req, res) => {

  const data = await User.find({ "_id": req.params.id })
  return res.json({
    data
  });
};



exports.getTest = async (req, res) => {


  return res.json({
    hello: "aliff"
  });
}; 