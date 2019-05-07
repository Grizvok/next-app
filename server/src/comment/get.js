// npm packages
const Router = require('express-promise-router');

// our packages
const db = require('../db/index');

const router = new Router();

// get all comments from a specific user
router.get('/user/:userID', async (req, res) => {
  const { userID } = req.params;
  const rows = await db.query(
    'SELECT ticket.ticket_title, ticket_comment.ticket_id_fkey, ticket_comment.id, comment, comment_creation_date, ticket_comment.last_edit, sci_user FROM users.ticket_comment INNER JOIN users.ticket ON(ticket.id = ticket_id_fkey) INNER JOIN users.client ON(client.id = ticket_comment.user_id_fkey) WHERE sci_user = $1',
    [userID]
  );
  const comments = rows.rows;

  res.send({ comments });
});

// get all comments for a specific ticket
router.get('/ticket/:ticketID', async (req, res) => {
  const { ticketID } = req.params;
  const rows = await db.query(
    'SELECT ticket_comment.id, comment, comment_creation_date, last_edit, sci_user FROM users.ticket_comment INNER JOIN users.client ON(client.id = user_id_fkey) WHERE ticket_id_fkey = $1 ORDER BY comment_creation_date DESC',
    [ticketID]
  );
  const comments = rows.rows;

  res.send({ comments });
});

// get all comments and coordinating tickets a user has commented on
router.get('/:userID/tickets', async (req, res) => {
  const userID = req.params;

  const rows = await db.query('SELECT ');
});

// get a specific comment
router.get('/:id', async (req, res) => {});

module.exports = router;
