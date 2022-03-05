const jwt = require("jsonwebtoken");
const admin = require("../plugins/firebase");
const db = admin.firestore();

const requestAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exist & is verfied?
  if (token) {
    jwt.verify(token, "net ninja secret", (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        console.log("JWT VERIFY", decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  // check json web token exist & is verfied?
  if (token) {
    jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        await db
          .collection("users")
          .where(admin.firestore.FieldPath.documentId(), "==", decodedToken.id)
          .get()
          .then((docSnapshot) => {
            return (user = docSnapshot.docs[0].data());
          })
          .then((user) => {
            res.locals.user = user;
            next();
          });
      }
    });
  } else {
    res.locals.user = null;
    res.redirect("/login");
  }
};

const getUserId = (token) => {
  if (!token) return null;
  return jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
    if (err) {
      return;
    } else {
      console.log("USER ID", decodedToken.id);
      return decodedToken.id;
    }
  });
};

module.exports = { requestAuth, checkUser, getUserId };
