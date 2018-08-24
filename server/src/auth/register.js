//npm packages
//const express = require("express");
const Router = require("express-promise-router");

//our packages
const db = require("../db/index");
const hasher = require("../util/hash");

const router = new Router();

router.post("/", async (req, res) => {
  const email = req.body.email;
  const hash = await hasher.createHash(req.body.password);
  const joinDate = new Date();

  const rows = await db.query("SELECT * FROM users.client WHERE email = $1", [
    email
  ]);
  if (rows.rowCount !== 0) {
    res.status(401).send({ error: "That email is already taken" });
    return;
  } else {
    await db.query(
      "INSERT INTO users.client(email, hash, join_date) VALUES ($1, $2, $3) RETURNING email",
      [email, hash, joinDate]
    );
    res.status(200).send(email);
  }
});

module.exports = router;
