const Router = require('express-promise-router');
const passport = require('./passport');
const jwt = require('jsonwebtoken');

const router = new Router();

router.post('/', passport.authenticate('local'), (req, res) => {
  if (req.user) {
    const token = jwt.sign(req.user, process.env.JWT_SECRET);
    res.send({ user: req.user, token: token });
  } else {
    res.status(401).send({ error: 'Error logging in' });
  }
});

module.exports = router;
