const Router = require('express-promise-router');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = new Router();
const db = require('../db/index');
const checkAuthentication = require('../util/checkAuthentication');

router.post('/', checkAuthentication, async (req, res) => {
  const { comment, ticket } = req.body;
  console.log(req.user.id);

  if (!comment || !comment.length) {
    res.status(400).send({ error: 'Comment should not be empty!' });
    return;
  }

  const rows = await db.query('SELECT id from users.ticket WHERE id = $1', [
    ticket,
  ]);

  if (!rows.rowCount) {
    res.status(400).send({ error: 'That ticket no longer exists!' });
    return;
  }

  try {
    const result = await db.query(
      'INSERT INTO users.ticket_comment(user_id_fkey, comment, ticket_id_fkey) VALUES($1, $2, $3)',
      [req.user.id, comment, ticket]
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Something went wrong' });
    return;
  }

  res.status(200).send({ comment });
});

module.exports = router;
