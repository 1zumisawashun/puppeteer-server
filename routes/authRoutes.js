const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const { check, validationResult } = require("express-validator");
const firebase = require("../plugins/firebase");
const db = firebase.firestore();
const bcrypt = require("bcrypt");

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/signup", authController.signup_get);
router.post(
  "/signup",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  async (req, res) => {
    const { email, password } = req.body;
    //validation here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // validations failed!
      return res.status(422).json({ errors: errors.array() });
    }
    //bcript here
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    //firestore here
    const user = await db.collection("users").add({
      email,
      hashPassword,
    });
    res.status(201).json(user);
    //res.send("new signup", { title: "new signup" });
  }
);
module.exports = router;
