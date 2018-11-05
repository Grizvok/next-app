//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();

router.delete('/:id', async (req, res) => {
  if (!req.user) {
    res.status(403).send({error: 'You need to be logged in to delete a ticket!'});
    return;
  }
  const user = req.user;
  const row = await db.query(
    'SELECT id from users.client WHERE sci_user = $1',
    [user]
  );
  const userID = row.rows[0].id;
});