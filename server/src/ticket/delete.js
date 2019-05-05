//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');
const checkAuthentication = require('../util/checkAuthentication');

const router = new Router();

router.delete('/:id', checkAuthentication, async (req, res) => {
  const { id } = req.params;
  const user = req.user.id;

  const ticket = await db.query(
    'SELECT user_id_fkey FROM users.ticket WHERE id = $1',
    [id]
  );

  if (ticket.rowCount === 0) {
    res.status(400).send({ error: 'That ticket does not exist' });
    return;
  }

  const ticketOwner = ticket.rows[0].user_id_fkey;

  if (ticketOwner !== user) {
    res.status(403).send({ error: 'You are not authorized' });
    return;
  }

  try {
    await db.query('DELETE FROM users.ticket WHERE ticket.id = $1', [id]);
  } catch (e) {
    res.status(500).send({ error: 'Something went wrong' });
    return;
  }
  res.status(200).send({ message: 'this ticket was successfully deleted' });
});

module.exports = router;
