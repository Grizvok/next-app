//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();

router.get('/:id', async (req, res) => {
  const user = req.params.id;
  const row = await db.query(
    'SELECT id from users.client WHERE sci_user = $1',
    [user]
  );
  const userID = row.rows[0].id;

  try {
    const rows = await db.query(
      'SELECT ticket_title, ticket_category FROM users.ticket LEFT JOIN users.client ON(client.id = user_id_fkey) WHERE client.id = $1',
      [userID]
    );
    const tickets = rows.rows;
    res.status(200).send({ tickets });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
