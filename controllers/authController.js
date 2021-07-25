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

const signup_get = (req, res) => {
  res.render("signup", { title: "signup" });
};
const login_get = (req, res) => {
  res.render("login", { title: "login" });
};

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
module.exports = {
  signup_get,
  login_get,
  login_post,
};
