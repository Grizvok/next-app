//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();

router.post('/', async (req, res) => {
  if (!req.user) {
    res
      .status(400)
      .send({ error: 'You need to be logged in to create a ticket!' });
    return;
  }
  const ticketTitle = req.body.ticketTitle.trim();
  const ticketCategory = req.body.ticketCategory;
  const ticketDescription = req.body.ticketDescription.trim();
  const userID = req.user;
  // console.log(user);
  // const row = await db.query(
  //   'SELECT id FROM users.client WHERE sci_user = $1',
  //   [user]
  // );
  // console.log(row);
  // const userID = row.rows[0].id;

  //form validation and sql insert
  if (ticketTitle.length > 9 && ticketTitle.length < 76) {
    if (ticketCategory) {
      if (ticketDescription.length > 99 && ticketDescription.length < 700) {
        await db.query(
          'INSERT INTO users.ticket(ticket_title, ticket_description, ticket_category, user_id_fkey) VALUES ($1, $2, $3, $4)',
          [ticketTitle, ticketDescription, ticketCategory, userID]
        );
        res.status(200).send({ ticket: ticketTitle });
        return;
      }
    }
  }

  res.status(400).send({ error: 'something went wrong' });
});

module.exports = router;
