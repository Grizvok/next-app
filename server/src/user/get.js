//npm packages
const Router = require('express-promise-router');
const cors = require('cors');
//our packages
const db = require('../db/index');

const router = new Router();

router.get('/', async (req, res) => {
  console.log('does this run?!');
  // console.log(req);
  let user;
  if (req.user) {
    user = req.user;
    res.send({ user });
    return;
  }
  res.send({ error: 'You are not authorized' });
});

router.get('/:id', cors(), async (req, res) => {
  console.log('this endpoint was hit!');
  console.log(req.params);
  if (req.params.id === req.user) {
    const user = req.user;
    console.log('i assume this runs?');
    res.send({ user });
    return;
  }
  //get user from database
  try {
    const rows = await db.query(
      'SELECT sci_user FROM users.client WHERE sci_user = $1',
      [req.params.id]
    );
    const user = rows.rows[0].sci_user;
    res.send({ user });
  } catch (e) {
    const Error = JSON.stringify(e);
    res.status(404).send({ error: 'This resource does not exist' });
  }
});

module.exports = router;
