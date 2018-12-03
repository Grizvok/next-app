//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();

router.delete('/:ticketID', async (req, res) => {
  //get ticket to delete
  const ticketID = req.params.ticketID;
  const user = req.user;
  const rows = await db.query(
    'DELETE FROM users.ticket WHERE ticket.id = $1',
    [ticketID]
  );
  res.status(200);
});

module.exports = router;
