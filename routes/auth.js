const express = require("express");
// const { models } = require("mongoose");
//express object has Router method
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
// const { request } = require("express");
const fetchuser = require("../middleware/fetchuser");


//endpoint to create a user
 
router.post(
  "/createuser",
  [
    body("email", "enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body(
      "password",
      "enter a valid password containing atleast 8 characters"
    ).isLength({ min: 8 }),
    body("name", "please enter a name").isLength({ min: 1 }),
  ],
  async (req, res) => {
    let success=false;
    ////////////console.log(req.body);
    //validating all credentials
    const errors = validationResult(req);
    ////////////console.log("hello");
    ////////////console.log(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:success,errors: errors.array() });
    }
    try {
      //checking whether same email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success:success, error: "sorry a user already exists with this email id" });
      }
      //can add await

      var salt = bcrypt.genSaltSync(10);
      var hash = await bcrypt.hash(req.body.password, salt);

      //if all credentials are perfect we create a user
      user = await User.create({
        name: req.body.name,
        password: hash,
        email: req.body.email,
      });

      var data = {
        user: { id: user.id },
      };

      //jwt token
      var jwt_secret = "iamagoodboy";
      var authtoken = jwt.sign(data, jwt_secret);
      ////////////console.log(authtoken);
      success=true;
      res.json({ success:success,authtoken });
    } catch (err) {
      res.status(500).json({ success:success,error: "some error occured" });
    }
  }
);

//endpoint to authenticate and login a user
router.post(
  "/loginuser",
  [
    body("email", "enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "enter a valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:success,errors: errors.array() });
    }
    let { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ success:success,error: "no user exists with this credentials" });
      }

      //if user exists
      //compare entered  password with hash in db

      //wrong password
      let password_compare = bcrypt.compareSync(password, user.password);
      if (!password_compare) {
        return res.status(400).json({ success:success,error: "incorrect password" });
      }

      //if password is correct
      //generate auth token
      var data = {
        user: { id: user.id },
      };

      //jwt token
      var jwt_secret = "iamagoodboy";
      var authtoken = jwt.sign(data, jwt_secret);
      ////////////console.log(authtoken);
      success=true;
      res.json({ success:success,authtoken });
    } catch (err) {
      res.status(500).json({ success:success,error: "some error occured" });
    }
  }
);

//endpoint to get user data from db with the help of token
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userid = req.user.id;
    let user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).json({ error: "some error occured" });
  }
});

module.exports = router;
