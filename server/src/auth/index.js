const register = require("./register");
const login = require("./login");

module.exports = server => {
  server.use("/api/register", register);
  server.use("/api/login", login);
};