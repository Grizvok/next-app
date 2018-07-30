const bcrypt = require("bcrypt");
const saltRounds = 12;

const hash = str => {
   return bcrypt.hash(str, saltRounds);
};

module.exports = hash;