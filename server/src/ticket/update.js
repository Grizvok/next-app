//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();

router.put('/:ticketID', async (req, res) => {
  if (!req.user) {
    res.status(400).send({ error: 'You must be logged in to update a ticket!' });
    return;
  }
  const user = req.user;
  const ticketID = req.params.ticketID;
  const rows = await db.query(
    'SELECT * FROM users.ticket WHERE ticket.id = $1 AND user_id_fkey = $2',
    [ticketID, user]
  );
});

module.exports = router;