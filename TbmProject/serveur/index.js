const express = require("express");
const cors = require("cors");
const User = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.get("/info-user", async (req, res) => {
  const { name } = req.query;
  var user = {};
  try {
    const snapshot = await User.get();
    snapshot.docs.forEach((doc) => {
      if (doc.data().name === name) {
        user = doc.data();
      }
    });
    if (user.length === 0) {
      return res.status(404).send({ message: "Not found" });
    } else {
      return res.send(user);
    }
  } catch (error) {
    return res.status(404).send({ message: "Not found" });
  }
});

app.post("/create", async (req, res) => {
  try {
    if (req.body.name.trim().length === 0) {
      return res.status(400).send({ message: "Besoin d'un nom chef" });
    }
    var user = {
      name: req.body.name,
      favoris: [],
    };
    await User.add({ ...user });
    return res.send({ message: "Created" });
  } catch (error) {
    return res.status(400).send({ message: "Besoin d'un nom chef" });
  }
});

app.put("/update", async (req, res) => {
  const snapshot = await User.get();
  snapshot.docs.forEach(async (doc) => {
    if (doc.data().name === req.body.name) {
      await User.doc(doc.id).update({ ...req.body });
    }
  });
  res.send({ msg: "Updated" });
});

app.delete("/delete-user", async (req, res) => {
  const { name } = req.query;
  try {
    const snapshot = await User.get();
    snapshot.docs.forEach(async (doc) => {
      if (doc.data().name === name) {
        await User.doc(doc.id).delete();
      }
    });
    return res.send({ message: "Deleted" });
  } catch (error) {
    return res.status(404).send({ message: "Not found" });
  }
});

// ----------------- FAVORIS -----------------

app.get("/get-favori", async (req, res) => {
  const { name } = req.query;
  var favoris = [];
  try {
    const snapshot = await User.get();
    snapshot.docs.forEach((doc) => {
      if (doc.data().name === name) {
        favoris = doc.data().favoris;
      }
    });
    if (favoris.length === 0) {
      return res.status(404).send({ message: "Not foundd" });
    } else {
      return res.send(favoris);
    }
  } catch (error) {
    return res.status(404).send({ message: "Not foundd" });
  }
});

app.post("/add-favori", async (req, res) => {
  try {
    var bus = {
      routeLineId: req.body.routeLineId,
      stopPointId: req.body.stopPointId,
      routeLine: req.body.routeLine,
      routeId: req.body.routeId,
      route: req.body.route,
    };

    const snapshot = await User.get();
    let alreadyFollowing = false;

    snapshot.docs.forEach(async (doc) => {
      if (doc.data().name === req.body.name) {
        const favoris = doc.data().favoris || [];
        for (let i = 0; i < favoris.length; i++) {
          if (favoris[i].route === req.body.route) {
            alreadyFollowing = true;
            break;
          }
        }
        if (!alreadyFollowing) {
          await User.doc(doc.id).update({
            favoris: [...favoris, bus],
          });
        }
      }
    });

    if (alreadyFollowing) {
      return res.status(400).send({ message: "You already follow this bus." });
    } else {
      return res.send({ message: "Added" });
    }
  } catch (error) {
    return res.status(404).send({ message: "Not found" });
  }
});

app.delete("/delete-favori", async (req, res) => {
  try {
    const { name } = req.query;
    const { route } = req.body;

    const snapshot = await User.get();
    alreadyNotFollowing = true;
    nomPresent = false;
    snapshot.docs.forEach(async (doc) => {
      if (doc.data().name === name) {
        nomPresent = true;
        const favoris = doc.data().favoris || [];
        for (let i = 0; i < favoris.length; i++) {
          if (favoris[i].route === route) {
            favoris.splice(i, 1);
            alreadyNotFollowing = false;
            break;
          }
        }
        if (alreadyNotFollowing) {
          return res
            .status(400)
            .send({ message: "You already don't follow this bus." });
        } else {
          await User.doc(doc.id).update({
            favoris: [...favoris],
          });
          return res.send({ message: "Deleted" });
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
