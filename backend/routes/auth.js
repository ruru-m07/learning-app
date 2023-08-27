const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "ruru";

//Router 1: create a user : POST "/api/auth/createuser"
router.post(
  "/createuser",
  body("name", "enter a valid name").isLength({ min: 3 }),
  body("email", "enter a valid email").isEmail(),
  body("password", "Password should be of length 8").isLength({ min: 8 }),
  async (req, res) => {
    let success = false;
    // if there are errors, return the bad request and the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success, error: error.array() });
    }

    try {
      // check the user with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "sorry a user with this email is alredy exist",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create a new user

      user = await User.create({
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        password: secPass,
        image: req.body.image,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 2: authenticate a user using : POST '/api/auth/login'
router.post(
  "/login",
  body("email", "Enter a valid mail").isEmail(),
  body("password", "Password can not be blank").exists(),
  async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "please try to login using correct email." });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "please try to login using correct password.",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3:  Get logged in user details : POST '/api/auth/getuser'
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

//Route 4: getallllthe user: POST '/api/auth/getalluser'
router.get("/getalluser", async (req, res) => {
  try {
    const alluser = await User.find({});
    res.send({ status: "ok", data: alluser });
  } catch (error) {
    console.log(error);
  }
});

//Route 5: getallllthe user: POST '/api/auth/getalluser/id'
router.get("/getalluser/:id", async (req, res, next) => {
  // console.log(req.params.id);
  try {
    let user = await User.findById({ _id: req.params.id }).select("-password");
    // console.log(user);
    res.send({ status: "ok", user: user });
  } catch (error) {
    console.log(error)
  }
});

// Route 6: send req : POST "api/auth/sendreq"

router.post("/sendreq" , async (req, res, next) => {

  try {
    // let user = await User.findById({ _id: req.params.id }).select("-password");
    console.log(req);
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
