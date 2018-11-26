//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();

router.delete('/:id', async (req, res) => {
  //get question
  const question = req.params.questionID;
  

  const user = req.user;
  const row = await db.query(
    'SELECT id from users.client WHERE sci_user = $1',
    [user]
  );
  const userID = row.rows[0].id;
});

module.exports = router;