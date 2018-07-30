const crypto = require("crypto");

exports.hash = str => {
  const sum = crypto.createHash("sha256");
  sum.update(str + authConfig.passwordSalt);
  return sum.digest("hex");
};
