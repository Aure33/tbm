import express from 'express';
import cors from 'cors';
import {getDoc,getDocs,addDoc,updateDoc,doc } from 'firebase/firestore';

const app = express();
app.use(cors());
app.use(express.json()); // Ajout du middleware pour le parsing du corps de la requête

import('./config.js').then((config) => {
  const { initFirebase } = config;

  const { User,db } = initFirebase();

  async function getUser(uid) {
    const snapshot = await getDocs(User);
    for (const document of snapshot.docs) {
      if (document.data().uid === uid) {
        var userDocRef = doc(User, document.id);
        const userDocSnapshot = await getDoc(userDocRef);
        return userDocSnapshot.data();
      }
    }
  }

  app.get("/", async (req, res) => {
    const querySnapshot = await getDocs(User);
    const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
  });
  
  app.get("/info-user", async (req, res) => {
    const { uid } = req.query;
    if (uid.trim().length === 0) {
      return res.status(400).send({ message: "t'es pas co le sang'" });
    }
    const user = await getUser(uid);
    if (user) {
      return res.send(user);
    } else {
      return res.status(404).send({ message: "Not found" });
    }
  });
  
  app.post("/create", async (req, res) => {
    try {
      const name = req.headers["x-name"];
      const uid = req.headers["x-uid"];
      const photoProfil = req.headers["x-photoprofil"];
      if (uid.trim().length === 0) {
        return res.status(400).send({ message: "Besoin d'un id chef" });
      }
      const snapshot = await getDocs(User);
      const userDoc = snapshot.docs.find((document) => document.data().uid === uid);
      if (userDoc) {
        await updateDoc(userDoc.ref, {
          name: name,
          photoProfil: photoProfil,
        });
        const updatedDoc = await getDoc(userDoc.ref);
        return res.send(updatedDoc.data());
      } else {
        const newUser = {
          name: name,
          uid: uid,
          photoProfil: photoProfil,
          favoris: [],
        };
        const docRef = await addDoc(User, newUser);
        return res.send({ ...newUser, id: docRef.id });
      }
    } catch (error) {
      return res.status(500).send({ message: "Une erreur est survenue" });
    }
  });
  
  
  // ----------------- FAVORIS -----------------
  
  app.get("/get-favori", async (req, res) => {
    const { uid } = req.query;
    if (uid.trim().length === 0) {
      return res.status(400).send({ message: "t'es pas co le sang'" });
    }
    const user = await getUser(uid);
    if (user) {
      return res.send(user.favoris);
    } else {
      return res.status(404).send({ message: "Not found" });
    }
  });
  
  app.post("/add-favori", async (req, res) => {
    try {
      if (req.body.uid.trim().length === 0) {
        return res.status(400).send({ message: "t'es pas co le sang'" });
      }
      var bus = {
        routeLineId: req.body.routeLineId,
        stopPointId: req.body.stopPointId,
        routeLine: req.body.routeLine,
        routeId: req.body.routeId,
        route: req.body.route,
        nomArret: req.body.nomArret,
        nomDestination: req.body.nomDestination,
      };
  
      const snapshot = await getDocs(User);
      let alreadyFollowing = false;
      snapshot.docs.forEach(async (document) => {
        if (document.data().uid === req.body.uid) {
          const favoris = document.data().favoris || [];
          for (let i = 0; i < favoris.length; i++) {
            if (favoris[i].route === req.body.route) {
              alreadyFollowing = true;
              break;
            }
          }
          if (!alreadyFollowing) {
            var userDocRef = doc(User, document.id)
            await updateDoc(userDocRef, {
              favoris: [...favoris, bus],
            });
            // renvoyer la nouvelle valeur du document au client
            const updatedDoc = await getDoc(userDocRef);
            if (updatedDoc.exists()) {
              res.send(updatedDoc.data());
            } else {
              res.status(404).send({ message: "Document non trouvé" });
            }
            
          }
        }
      });
  
      if (alreadyFollowing) {
        return res.status(400).send({ message: "Tu suis déjà ce bus." });
      }
    } catch (error) {
      return res.status(404).send({ message: "Bug jsp pk" });
    }
  });
  
  app.delete("/delete-favori", async (req, res) => {
    try {
      const { uid } = req.query;
      if (uid.trim().length === 0) {
        return res.status(400).send({ message: "t'es pas co le sang'" });
      }
      const route = req.body.route;
      const snapshot = await getDocs(User);
      let alreadyNotFollowing = true;
      let nomPresent = false;
  
      snapshot.docs.forEach(async (document) => {
        if (document.data().uid === uid) {
          nomPresent = true;
          const favoris = document.data().favoris || [];
          for (let i = 0; i < favoris.length; i++) {
            if (favoris[i].route === route) {
              favoris.splice(i, 1);
              alreadyNotFollowing = false;
              break;
            }
          }
          if (alreadyNotFollowing) {
            return res.status(400).send({ message: "You already don't follow this bus." });
          } else {
            const userDocRef = doc(User, document.id);
            await updateDoc(userDocRef, {
              favoris: [...favoris],
            });
            const updatedDoc = await getDoc(userDocRef);
            if (updatedDoc.exists()) {
              res.send(updatedDoc.data());
            } else {
              res.status(404).send({ message: "Document not found" });
            }
          }
        }
      });
  
      if (!nomPresent) {
        return res.status(404).send({ message: "Not found" });
      }
    } catch (error) {
      return res.status(404).send({ message: "Not found" });
    }
  });
});

app.delete("/delete-all-favori", async (req, res) => {
  try {
    const { uid } = req.query;
    if (uid.trim().length === 0) {
      return res.status(400).send({ message: "t'es pas co le sang'" });
    }
    const snapshot = await getDocs(User);
    let nomPresent = false;
    snapshot.docs.forEach(async (document) => {
      if (document.data().uid === uid) {
        nomPresent = true;
        const userDocRef = doc(User, document.id);
        await updateDoc(userDocRef, {
          favoris: [],
        });
        const updatedDoc = await getDoc(userDocRef);
        if (updatedDoc.exists()) {
          res.send(updatedDoc.data());
        } else {
          res.status(404).send({ message: "Document not found" });
        }
      }
    });

    if (!nomPresent) {
      return res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    return res.status(404).send({ message: "Not found" });
  }
});



app.listen(4000, () => console.log("Up & RUnning *4000"));
