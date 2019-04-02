//npm packages
const Router = require('express-promise-router');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//our packages
const db = require('../db/index');

const router = new Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log(req.headers);
    const token = req.headers['authorization'].split(' ')[1];

    const user = await jwt.verify(token, process.env.JWT_SECRET);

    if (!req.user) {
      res
        .status(400)
        .send({ error: 'You need to be logged in to create a ticket!' });
      return;
    }
    const ticketTitle = req.body.ticketTitle.trim();
    const ticketCategory = req.body.ticketCategory;
    const ticketDescription = req.body.ticketDescription.trim();

    if (ticketTitle.length > 9 && ticketTitle.length < 76) {
      if (ticketCategory) {
        if (ticketDescription.length > 99 && ticketDescription.length < 700) {
          const getUserID = await db.query(
            'SELECT id FROM users.client WHERE sci_user = $1',
            [user]
          );
          const userID = getUserID.rows[0].id;
          const result = await db.query(
            'INSERT INTO users.ticket(ticket_title, ticket_description, ticket_category, user_id_fkey) VALUES ($1, $2, $3, $4) RETURNING *',
            [ticketTitle, ticketDescription, ticketCategory, userID]
          );
          console.log(result);
          const ticket = result.rows[0];
          ticket.sci_user = user;
          // console.log(ticket);
          res.status(200).send({ ticket });
          return;
        }
      }
    }
    res.status(400).send({ error: 'something went wrong' });
  }
);

module.exports = router;
