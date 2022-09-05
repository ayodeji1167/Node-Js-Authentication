const jwt = require('jsonwebtoken');

const createToken = (payload, expiresIn, secret = process.env.JWT_SECRET) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

module.exports = createToken;
