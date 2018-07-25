const register = require("./register");

module.exports = server => {
  server.use("/api/register", register);
};
