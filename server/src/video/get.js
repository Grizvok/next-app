const Router = require("express-promise-router");

//our packages
const db = require("../db/index");

const router = new Router();

router.get("/", async (req, res) => {
  if (req.user) {
    const rows = await db.query("SELECT id FROM users.client WHERE email = $1", [
      req.user
    ]);
    console.log(rows);
  }


  if (!req.user) {
    res.status(401).send({error: "You must be logged in to access your videos!"})
  }
});

module.exports = router;