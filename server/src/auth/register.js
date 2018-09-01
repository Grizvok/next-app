//npm packages
//const express = require("express");
const Router = require("express-promise-router");

//our packages
const knex = require("../db/index");
const hasher = require("../util/hash");

const router = new Router();

router.post("/", async (req, res) => {
  const user = req.body.user;
  const hash = await hasher.createHash(req.body.password);
  const joinDate = new Date();

  const rows = await knex.select('sci_user').from('client').where('sci_user', user);


  // const rows = await db.query("SELECT * FROM users.client WHERE sci_user = $1", [
  //   user
  // ]);
  if (rows.rowCount !== 0) {
    res.status(401).send({ error: "That username is already taken" });
    return;
  } else {
   await knex.insert('')
    res.status(200).send(email);
  }
});

module.exports = router;



// await db.query(
//   "INSERT INTO users.client(email, hash, join_date) VALUES ($1, $2, $3) RETURNING email",
//   [email, hash, joinDate]
// );