import express from "express";
import cors from "cors";
import { firestore, rtdb } from "./db";
import { nanoid } from "nanoid";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.post("/signup", async (req, res) => {
  const { email, nombre } = req.body;

  try {
    const newUserRef = await firestore.collection("users").add({
      email,
      nombre
    });

    res.json({
      id: newUserRef.id
    });
  } catch (error) {
    console.error("ERROR EN FIRESTORE:", error);
    res.status(500).json({ error: "No se pudo crear el usuario en Firestore" });
  }
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;

  firestore.collection("users").doc(userId).get().then(doc => {
    if (doc.exists) {
      const roomRef = rtdb.ref("rooms/" + nanoid());
      roomRef.set({
        owner: userId,
        currentGame: {

        }
      }).then(() => {
        const roomLongId = roomRef.key;
        const roomIdShort = (1000 + Math.floor(Math.random() * 9000)).toString();

        firestore.collection("rooms").doc(roomIdShort).set({
          rtdbId: roomLongId
        }).then(() => {
          res.json({ id: roomIdShort });
        });
      });
    } else {
      res.status(401).json({ message: "El usuario no existe" });
    }
  });
});

app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;

  firestore.collection("users").doc(userId as string).get().then(doc => {
    if (doc.exists) {
      firestore.collection("rooms").doc(roomId).get().then(snap => {
        if (snap.exists) {
          res.json(snap.data());
        } else {
          res.status(404).json({ message: "La sala no existe" });
        }
      });
    } else {
      res.status(401).json({ message: "No estás autorizado" });
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});