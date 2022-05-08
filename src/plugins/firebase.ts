import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
const ServiceAccount = require('../../ServiceAccount.json');

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
    storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
  });
}

const projectFiresore = admin.firestore();
const projectStorage = admin.storage();
const documentId = admin.firestore.FieldPath.documentId();
const serverTimestamp = admin.firestore.FieldValue.serverTimestamp();

export { projectFiresore, projectStorage, documentId, serverTimestamp, admin };
