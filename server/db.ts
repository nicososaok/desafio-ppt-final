import * as admin from "firebase-admin";

let serviceAccount;

if (process.env.FIREBASE_CONFIG) {
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  serviceAccount = require("./key.json");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://desafio-ppt-final-default-rtdb.firebaseio.com"
  });
}

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };