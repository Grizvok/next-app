//npm packages
const Router = require('express-promise-router');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//our packages
const db = require('../db/index');

const router = new Router();

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { id } = req.params;
    // get new ticket description and ticketOwner
    const { description, ticketOwner } = req.body;

    // make sure ticket description is not empty
    if (description !== undefined && !description.length) {
      res.status(400).send({ error: 'Description should not be empty' });
      return;
    }
    // get ticket and make sure it exists
    const ticket = await db.query(
      'SELECT id from users.ticket WHERE id = ($1)',
      [id]
    );

    if (ticket.rowCount === 0) {
      res.status(400).send({ error: 'Ticket not found' });
      return;
    }

    // check if ticketOwner is the same as user in jwt
    const token = req.headers['authorization'].split(' ')[1];
    const user = await jwt.verify(token, process.env.JWT_SECRET);

    if (ticketOwner !== user) {
      res
        .status(403)
        .send({ error: 'Not enough rights to perform that action' });
      return;
    }

    const editDate = new Date();

    // try saving edited ticket to db
    try {
      const rows = await db.query(
        'UPDATE users.ticket SET ticket_description = ($1), last_edit = ($2) WHERE id = ($3)',
        [description, editDate, id]
      );
      res.status(200).send({ description });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  }
);

module.exports = router;
