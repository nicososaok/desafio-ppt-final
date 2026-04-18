import * as admin from "firebase-admin";

let serviceAccount;

// 1. Intentamos primero por Variable de Entorno (Prioridad Render)
if (process.env.FIREBASE_CONFIG) {
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  // 2. Si no hay variable, intentamos cargar el archivo (Caso Local)
  try {
    serviceAccount = require("./key.json");
  } catch (error) {
    console.error("No se encontró key.json localmente, pero no pasa nada si estás en Render.");
  }
}

// 3. Solo inicializamos si logramos obtener la cuenta de alguna de las dos formas
if (serviceAccount && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://desafio-ppt-final-default-rtdb.firebaseio.com"
  });
} else if (!serviceAccount) {
  console.error("CRÍTICO: No se pudo cargar la configuración de Firebase.");
}

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };