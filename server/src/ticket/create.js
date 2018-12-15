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

  if (ticketTitle.length > 9 && ticketTitle.length < 76) {
    if (ticketCategory) {
      if (ticketDescription.length > 99 && ticketDescription.length < 700) {
        const result = await db.query(
          'INSERT INTO users.ticket(ticket_title, ticket_description, ticket_category, user_id_fkey) VALUES ($1, $2, $3, $4) RETURNING id',
          [ticketTitle, ticketDescription, ticketCategory, userID]
        );
        const ticket = result.rows[0].id;
        res.status(200).send({ticket});
        return;
      }
    }
  }
  res.status(400).send({ error: 'something went wrong' });
});

module.exports = router;
