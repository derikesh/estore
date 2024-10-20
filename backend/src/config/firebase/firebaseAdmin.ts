import admin from 'firebase-admin';
import serviceAccount from '../firebase/serviceAcc.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: 'e-store-6c45d.appspot.com',  // Firebase Storage for file upload
});

console.log("Firebase Admin initialized successfully!");

export const bucket = admin.storage().bucket();

export default admin;
