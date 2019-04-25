const Router = require('express-promise-router');
const passport = require('./passport');
const jwt = require('jsonwebtoken');

const router = new Router();

router.post('/', passport.authenticate('local'), async (req, res) => {
  if (req.user) {
    const token = await jwt.sign(req.user, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie('token', token, { maxAge: 1186400, httpOnly: true })
      .send({ user: req.user, token });
  } else {
    res.status(401).send({ error: 'Error logging in' });
  }
});

module.exports = router;
