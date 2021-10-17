const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const ServiceAccount = require("../ServiceAccount.json");
if (admin.apps.length === 0) {
  admin.initializeApp({ credential: admin.credential.cert(ServiceAccount) });
}
const db = admin.firestore();

const requestAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exist & is verfied?
  if (token) {
    jwt.verify(token, "net ninja secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log("jwtがあるのでログインを許可します。");
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//check user

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  // check json web token exist & is verfied?
  if (token) {
    jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
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
        // inject the middleware
      }
    });
  } else {
    res.locals.user = null;
    res.redirect("/login");
  }
};

module.exports = { requestAuth, checkUser };
