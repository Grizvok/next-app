const Router = require("express-promise-router");

const router = new Router();

router.post("/", (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.redirect("/login");
  }
});

module.exports = router;