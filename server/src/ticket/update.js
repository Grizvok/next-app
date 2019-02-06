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
    //get changed ticket description
    const { description, ticketOwner } = req.body;
    console.log(ticketOwner);

    //check if ticketOwner is the same as user in jwt
    const token = req.headers['authorization'].split(' ')[1];
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    const editDate = new Date();

    const rows = await db.query(
      'UPDATE users.ticket SET ticket_description = ($1), last_edit = ($2) WHERE id = ($3)',
      [description, editDate, id]
    );
    res.status(200).send({ description });
  }
);

module.exports = router;
