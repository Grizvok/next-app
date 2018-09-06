//npm packages
const Router = require('express-promise-router');
const cors = require('cors');
//our packages
const db = require('../db/index');

const router = new Router();

router.get('/:id', cors(), async (req, res) => {
  if (req.params.id === req.user) {
    res.send(req.user);
    return;
  }
  //get user from database
  try {
    const rows = await db.query(
      'SELECT sci_user FROM users.client WHERE sci_user = $1',
      [req.params.id]
    );
    const user = rows.rows[0].sci_user;
    res.send(user);
  } catch (e) {
    const Error = JSON.stringify(e);
    res.status(404).send({ error: "This resource does not exist"});
  }
});

module.exports = router;
