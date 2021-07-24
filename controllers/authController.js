const signup_get = (req, res) => {
  res.render("signup", { title: "signup" });
};
const login_get = (req, res) => {
  res.render("login", { title: "login" });
};

const login_post = (req, res) => {
  const { email, password } = res.body;
  console.log(email, password);
  res.send("user login", { title: "user login" });
};
module.exports = {
  signup_get,
  login_get,
  login_post,
};
