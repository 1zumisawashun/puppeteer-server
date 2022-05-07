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

export { projectFiresore, projectStorage, admin };
