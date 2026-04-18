import * as admin from "firebase-admin";
import * as key from "./key.json";

const serviceAccount = JSON.parse(JSON.stringify(key));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://desafio-ppt-final-default-rtdb.firebaseio.com"
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };