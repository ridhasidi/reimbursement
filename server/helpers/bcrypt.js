const bcrypt = require("bcryptjs");

function passwordEncryption(plainPassword) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainPassword, salt);
  return hash;
}

function comparePassword(plain, hash) {
  return bcrypt.compareSync(plain, hash);
}

module.exports = {
  passwordEncryption,
  comparePassword,
};
