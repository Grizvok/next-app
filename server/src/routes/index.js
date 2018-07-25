const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  res.end("We made it!");
});

router.get("/register", (req, res) => {
  res.end("Hit my post endpoint!");
});

router.post("/register", (req, res) => {
  console.log(req.body);
});

module.exports = router;
