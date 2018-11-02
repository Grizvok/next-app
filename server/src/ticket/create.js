const Router = require('express-promise-router');

const router = new Router();

router.post('/', async (req, res) => {
  console.log('this endpoint ran!');
  console.log(req);
  res.send(200);
});