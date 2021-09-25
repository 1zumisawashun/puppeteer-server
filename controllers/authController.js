const firebase = require("../plugins/firebase");
const db = firebase.firestore();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

//create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

const signup_get = (req, res) => {
  res.render("signup", { title: "signup" });
};
const login_get = (req, res) => {
  res.render("login", { title: "login" });
};
const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  //expire quickly because maxAge is 1
  res.redirect("/");
};

//next使えば移動できそう

const login_post = async (req, res) => {
  const { email, password } = req.body;
  await db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then((docSnapshot) => {
      const user = [];
      docSnapshot.forEach((doc) => {
        user.push({ id: doc.id, ...doc.data() });
      });
      return user[0];
    })
    .then(async (user) => {
      console.log(user);
      const newErrors = {};
      if (user) {
        const auth = await bcrypt.compare(password, user.hashPassword);
        if (auth) {
          console.log(auth, "authはあります！");
          const token = await createToken(user.id);
          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1800 });
          return res.status(201).json({ user: user.id });
          //pass with data to login.ejs
        }
        newErrors.password = "inncorect password!";
        return res.status(422).json(newErrors);
        //already linked to login.ejs
      }
      newErrors.email = "inncorect email!";
      return res.status(422).json(newErrors);
    });
};

const signup_post = async (req, res) => {
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
};
module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
};
