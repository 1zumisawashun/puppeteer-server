const admin = require("firebase-admin");
require("dotenv").config();
const ServiceAccount = require("../ServiceAccount.json");

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
    storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
  });
}

module.exports = admin;
