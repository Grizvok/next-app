//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();

//get a list of a who a user is following
router.get('/', async (req, res) => {
  console.log('this runs?');
  if (req.user) {
    const rows = await db.query(
      'SELECT following FROM users.client_follow WHERE follower = $1',
      []
    );
  }
  res.send(200);
});

router.post('/', async (req, res) => {
  const followerRows = await db.query(
    'SELECT id FROM users.client WHERE sci_user = $1',
    [req.body.followerUser]
  );
  const followingRows = await db.query(
    'SELECT id FROM users.client WHERE sci_user = $1',
    [req.body.followingUser]
  );
  const follower = followerRows.rows[0].id;
  const following = followingRows.rows[0].id;

  const rows = await db.query(
    'INSERT INTO users.client_follow(follower, following) VALUES($1, $2)',
    [follower, following]
  );
  res.status(200).send({ data: 'Hello World!' });
});

router.delete('/:id', async (req, res) => {});

module.exports = router;
