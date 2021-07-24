const firebase = require("../plugins/firebase");
const db = firebase.firestore();

//handle error
const handleErrors = (error) => {
  console.log(error.messgae, error.code);
};

module.exports.signup_get = (req, res) => {
  res.render("signup", { title: "signup" });
};
module.exports.login_get = (req, res) => {
  res.render("login", { title: "login" });
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await db.collection("users").add({
      email,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    handleErrors(error);
    res.status(404).send("error, user not created");
  }
  res.send("new signup", { title: "new signup" });
};
module.exports.login_post = (req, res) => {
  const { email, password } = res.body;
  console.log(email, password);
  res.send("user login", { title: "user login" });
};
