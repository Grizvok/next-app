const Router = require("express-promise-router");

//our packages
const db = require("../db/index");

const router = new Router();

router.post("/", async (req, res) => {
  if (!req.user) {
    res.send({error: 'You are not authorized to perform that action'});
    return;
  }
  
});

module.exports = router;