const jwt = require('jsonwebtoken');
const jwtSecret = 'secretCode';

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access denied. Invalid token.');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send('Access denied. Invalid token.');
  }
};

module.exports = jwtMiddleware;
