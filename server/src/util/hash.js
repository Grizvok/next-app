const bcrypt = require("bcrypt");

const hasher = {
  saltRounds: 12,
  createHash: password => {
    return bcrypt.hash(password, hasher.saltRounds);
  },
  compareHash: async (password, userHash) => {
    return (match = await bcrypt.compare(password, userHash));
  }
};
module.exports = hasher;
