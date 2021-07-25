const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const { check, validationResult } = require("express-validator");
const firebase = require("../plugins/firebase");
const db = firebase.firestore();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/signup", authController.signup_get);
router.post(
  "/signup",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  //we need to add validation of same email
  async (req, res) => {
    const { email, password } = req.body;
    //validation here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // failed!
      const newErrors = {};
      errors.errors.forEach((err, index) => {
        if (err.param.includes("email")) {
          newErrors.email = "Please enter a valid email";
        } else if (err.param.includes("password")) {
          newErrors.password = "Minimum password length is a 6 characters";
        }
      });
      return res.status(422).json(newErrors);
      //this data send to signup.ejs and possible to get res.json()
    }
    //bcript here
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    //firestore here
    const user = await db
      .collection("users")
      .add({
        email,
        hashPassword,
      })
      .then(async (result) => {
        const token = await createToken(result.id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1800 });
        res.status(201).json({ user: result.id });
        //this data send to signup.ejs and possible to get res.json()
      });
  }
);

module.exports = router;
