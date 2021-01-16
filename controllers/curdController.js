
var fs = require('fs').promises;
const User = require('../models/curd');


exports.addData = async (req, res) => {
  const data = req.body.data ? JSON.parse(req.body.data) : {}
  const imageBuffer = req.body.image.split(",")[1];

  const user = new User({ data });

  console.log("trying to save");
  user.save((err, user) => {
    if (err) {
      console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
      return res.status(401).json({
        error: 'Error saving user in database. Try signup again'
      });
    }
    console.log("saved");
    fs.writeFile(`public/${user._id}.png`, imageBuffer, 'base64')
    return res.json({
      user: user._id
    });

  });


};


exports.getFace = async (req, res) => {
  const data = await User.find({}, "_id image")
  return res.json({
    data
  });
};

exports.delUser = async (req, res) => {
  const data = await User.findByIdAndDelete({ "_id": req.params.id })
  return res.send("deleted");
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



exports.run = async (req, res) => {
  const exec = require("child_process").exec
  exec("python3 run.py", (error, stdout, stderr) => {
    res.json({ stdout });
  })
}; 
