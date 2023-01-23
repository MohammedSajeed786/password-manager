const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Passwords = require("../models/Passwords.js");
const { body, validationResult } = require("express-validator");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('iamaboy');

//express object has Router method
const router = express.Router();


//ALL ENDPOINTS REQUIRE LOGIN HENCE WE USE AUTH TOKEN TO VERIFY HIM/HER

//endpoint to fetch all passwords of a user with the help of user id in jwt token
router.get("/fetchallpasswords", fetchuser, async (req, res) => {
  // console.log(req);
  try {
    //console.log(req);
    let passwords = await Passwords.find({ user: req.user.id });
    //console.log(passwords);
  //  const obj= passwords.parse();
  //  console.log(obj);
  // let json=passwords.json();
  // console.log(json);
  // new_pass.map((element)=>{
    
  // })

    res.json(passwords);
  } catch (err) {
    res.status(500).json({ error: "some error occured" });
  }
});

//endpoint to create password
router.post(
  "/createpasswords",
  [
    body("password", "enter a password").isLength({ min: 8 }),
    body("email", "enter a email").isEmail(),
    body("platform", "enter a platform").isLength({ min: 5 }),
  ],
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let password = new Passwords({
        user: req.user.id,
        platform: req.body.platform,
        email: req.body.email,
        password: req.body.password
        //cryptr.encrypt(req.body.password),
      });
      let savedpassword = await password.save();
      res.json(savedpassword);
    } catch (err) {
      res.status(500).json({ error: "some error occured" });
    }
  }
);

//endpoint to update passwords having id in route as /update/:id
router.put("/update/:id", fetchuser, async (req, res) => {
  try {
    let { platform, email, password } = req.body;
    let newdata = {};
    if (platform) newdata.platform = platform;
    if (email) newdata.email = email;
    if (password) newdata.password = password
    //cryptr.encrypt(password);
    let findpassword = await Passwords.findById(req.params.id);
    if (!findpassword) {
      res.status(404).send("no data found");
    }

    //checking user who created the password and user id in jwt token are same
    if (findpassword.user.toString() !== req.user.id) {
      res.status(401).send("access denied");
    }
    let updateddata = await Passwords.findByIdAndUpdate(
      req.params.id,
      { $set: newdata },
      { new: true }
    );
    res.json(updateddata);
  } catch (err) {
    res.status(500).json({ error: "some error occured" });
  }
});

//endpoint to delete a password
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    let findpassword = await Passwords.findById(req.params.id);
    if (!findpassword) {
      res.status(404).send("no data found");
    }
    if (findpassword.user.toString() !== req.user.id) {
      res.status(401).send("access denied");
    }
    let deleteddata = await Passwords.findByIdAndDelete(req.params.id);
    res.json(deleteddata);
  } catch (err) {
    res.status(500).json({ error: "some error occured" });
  }
});
module.exports = router;
