const Router = require("express-promise-router");
const passport = require("./passport");

//our packages
const db = require("../db/index");

const router = new Router();

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
});

module.exports = router;
