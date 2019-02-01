//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();
//get specific ticket
router.get('/user/:ticketID', async (req, res) => {
  const ticketID = req.params.ticketID;
  const rows = await db.query(
    'SELECT ticket.id, ticket_title, ticket_category, ticket_creation_date, ticket_description, sci_user FROM users.ticket INNER JOIN users.client ON(client.id = user_id_fkey) WHERE ticket.id = $1',
    [ticketID]
  );
  const ticket = rows.rows;
  res.status(200).send({ ticket });
});

//get all tickets by a certain user
router.get('/:userID', async (req, res) => {
  const user = req.params.userID;
  const rows = await db.query(
    'SELECT ticket.id, ticket_title, ticket_category, ticket_creation_date, ticket_description, sci_user FROM users.ticket INNER JOIN users.client ON(client.id = user_id_fkey) WHERE sci_user = $1 ORDER BY ID DESC',
    [user]
  );
  const tickets = rows.rows;
  res.status(200).send({ tickets });
});

module.exports = router;
