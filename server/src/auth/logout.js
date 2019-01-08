const Router = require('express-promise-router');

const router = new Router();

router.post('/', async (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.status(200).send({ message: 'You were successfully logged out' });
  }
});

module.exports = router;
