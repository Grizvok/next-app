const Router = require('express-promise-router');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = new Router();
const db = require('../db/index');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const user = await jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).send({ user });
  }
);

module.exports = router;
