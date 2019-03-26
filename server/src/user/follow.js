//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();

//get a list of a who a user is following
router.get('/follow', async (req, res) => {
  // if (req.user) {
  //   const rows = await db.query(
  //     'SELECT following FROM users.client_follow WHERE follower = $1',
  //     [req.user]
  //   );
  //   res.status(200).send({ data: 'Hello World!' });
  // }
});

router.post('/follow', async (req, res) => {
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
