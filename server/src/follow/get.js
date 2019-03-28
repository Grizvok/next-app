//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();
//get all followed users for a specific user
// router.get('/', async (req, res) => {});

//get all followed users of a specific user
router.get('/:id', async (req, res) => {
  console.log('this ran!', req.user);
  res.status(200).send({ data: 'everything worked!' });
});

module.exports = router;
