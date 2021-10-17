const admin = require("firebase-admin");
require("dotenv").config();
const ServiceAccount = require("../ServiceAccount.json");

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
  });
}

module.exports = admin;
