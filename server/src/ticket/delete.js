//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();

router.delete('/:ticketID', async (req, res) => {
  if (!req.user) {
    res
      .status(400)
      .send({ error: 'You do need have the required permissions' });
    return;
  }
  //get ticket to delete
  const ticketID = req.params.ticketID;
  const user = req.user;
  const rows = await db.query(
    'DELETE FROM users.ticket WHERE ticket.id = $1 AND user_id_fkey = $2',
    [ticketID, user]
  );
  res.status(200).send({ message: 'this ticket was successfully deleted' });
  return;
});

module.exports = router;
