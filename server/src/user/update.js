const Router = require('express-promise-router');

const router = new Router();

router.post('/', async (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;