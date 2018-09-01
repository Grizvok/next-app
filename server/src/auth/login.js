const Router = require('express-promise-router');
const passport = require('./passport');

const router = new Router();

router.post('/', passport.authenticate('local'), (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
