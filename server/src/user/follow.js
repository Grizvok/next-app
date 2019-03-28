//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();

//get a list of a who a user is following
router.get('/:user', async (req, res) => {
  const { user } = req.params;
  const rows = await db.query(
    'SELECT id FROM users.client WHERE sci_user = $1',
    [user]
  );
  const id = rows.rows[0].id;
  const query = {
    text:
      'SELECT sci_user FROM users.client INNER JOIN users.client_follow ON(client.id = following) WHERE follower = $1',
    values: [id],
    rowMode: 'array',
  };
  const followedUserQuery = await db.query(query);
  const followedUsers = followedUserQuery.rows[0];
  res.status(200).send({ data: followedUsers });
});

router.post('/', async (req, res) => {
  const followerRows = await db.query(
    'SELECT id FROM users.client WHERE sci_user = $1',
    [req.body.followerUser]
  );
  const follower = followerRows.rows[0].id;

  const followingRows = await db.query(
    'SELECT id FROM users.client WHERE sci_user = $1',
    [req.body.followingUser]
  );
  const following = followingRows.rows[0].id;

  const duplicateCheck = await db.query(
    'SELECT * FROM users.client_follow WHERE follower = $1 AND following = $2',
    [follower, following]
  );

  if (duplicateCheck.rows.length > 0) {
    res.status(400).send({ error: 'Something went wrong!' });
    return;
  }

  try {
    const rows = await db.query(
      'INSERT INTO users.client_follow(follower, following) VALUES($1, $2)',
      [follower, following]
    );
  } catch (e) {
    res.status(500).send({ error: 'something went wrong' });
  }
  res.status(200).send({ data: 'Hello World!' });
});

module.exports = router;
