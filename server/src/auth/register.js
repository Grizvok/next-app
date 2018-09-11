//npm packages
//const express = require("express");
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');
const hasher = require('../util/hash');

const router = new Router();

router.post('/', async (req, res) => {
  const user = req.body.user;
  const hash = await hasher.createHash(req.body.password);
  const joinDate = new Date();
  const rows = await db.query(
    'SELECT id FROM users.client WHERE sci_user = $1',
    [user]
  );
  if (rows.rowCount !== 0) {
    res.status(401).send({ error: 'That username is already taken' });
    return;
  } else {
    await db.query(
      'INSERT INTO users.client(sci_user, hash, join_date) VALUES ($1, $2, $3) RETURNING sci_user',
      [user, hash, joinDate]
    );
    res.status(200).send({user});
  }
});

module.exports = router;