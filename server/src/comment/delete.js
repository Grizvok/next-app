const Router = require('express-promise-router');
const db = require('../db/index');
const router = new Router();

const checkAuthentication = require('../util/checkAuthentication');

router.delete('/:id', checkAuthentication, async (req, res) => {
  const user = req.user.id;
  const { id } = req.params;

  const comment = await db.query(
    'SELECT user_id_fkey FROM users.ticket_comment WHERE id = $1',
    [id]
  );

  if (comment.rowCount === 0) {
    res.status(400).send({ error: 'That comment no longer exists!' });
    return;
  }

  const commentOwner = comment.rows[0].user_id_fkey;

  if (commentOwner !== user) {
    res
      .status(403)
      .send({ error: 'You are not authorized to perform that action' });
    return;
  }

  try {
    await db.query(
      'DELETE FROM users.ticket_comment WHERE ticket_comment.id = $1',
      [id]
    );
  } catch (e) {
    res.status(500).send({ error: 'Something went wrong', e });
    return;
  }
  res.status(200).send({ message: 'the comment was successfully deleted' });
});

module.exports = router;
