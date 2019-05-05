// npm packages
const Router = require('express-promise-router');

// our packages
const db = require('../db/index');
const checkAuthentication = require('../util/checkAuthentication');

const router = new Router();

router.patch('/:id', checkAuthentication, async (req, res) => {
  const { id } = req.params;
  const user = req.user.id;
  const { text } = req.body;

  if (text !== undefined && !text.length) {
    res.status(400).send({ error: 'Comment should not be empty!' });
  }

  const comment = await db.query(
    'SELECT user_id_fkey FROM users.ticket_comment WHERE id = $1',
    [id]
  );

  if (comment.rowCount === 0) {
    res.status(400).send({ error: 'Comment was not found!' });
    return;
  }

  const commentOwner = comment.rows[0].user_id_fkey;

  if (commentOwner !== user) {
    res
      .status(403)
      .send({ error: 'You are not authorized to perform that action' });
    return;
  }

  const editDate = new Date();

  try {
    const rows = await db.query(
      'UPDATE users.ticket_comment SET comment = ($1), last_edit = ($2) WHERE id = ($3)',
      [text, editDate, id]
    );
    res.status(200).send({ text });
    return;
  } catch (e) {
    res.status(500).send({ error: e });
    return;
  }
});

module.exports = router;
