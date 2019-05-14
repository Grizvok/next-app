// npm packages
const Router = require('express-promise-router');

// our packages
const db = require('../db/index');

const router = new Router();

// get all comments from a specific user
router.get('/user/:userID', async (req, res) => {
  const { userID } = req.params;
  const rows = await db.query(
    'SELECT b.ticket_title, b.ticket_category, a.ticket_id_fkey, a.id, a.comment, a.comment_creation_date, a.last_edit, c.sci_user AS ticket_commenter, d.sci_user AS ticket_creator FROM users.ticket_comment a INNER JOIN users.ticket b ON(b.id = a.ticket_id_fkey) INNER JOIN users.client c ON(c.id = a.user_id_fkey) INNER JOIN users.client d ON(d.id = b.user_id_fkey) WHERE c.sci_user = $1 ORDER BY a.comment_creation_date DESC',
    [userID]
  );
  const comments = rows.rows;

  console.log(rows.rows);

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

// get a specific comment
router.get('/:id', async (req, res) => {});

module.exports = router;
