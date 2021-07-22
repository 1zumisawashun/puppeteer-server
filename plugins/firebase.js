//import firebase from "firebase";
const firebase = require("firebase");
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDsn2RJvn0-QvFaXRAIMFfbgADRhe0f3G4",
    authDomain: "puppeteer-466fa.firebaseapp.com",
    projectId: "puppeteer-466fa",
    storageBucket: "puppeteer-466fa.appspot.com",
    messagingSenderId: "691021288509",
    appId: "1:691021288509:web:140e5c4dd58d33eee14654",
    measurementId: "G-PKHLZSS5KY",
  });
}
//export default firebase;
module.exports = firebase;
