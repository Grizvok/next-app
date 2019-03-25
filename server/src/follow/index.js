const get = require('./get');

module.exports = (server) => {
  server.use('/api/follow', get);
};

// const register = require('./register');
// const login = require('./login');
// const logout = require('./logout');

// module.exports = (server) => {
//   server.use('/api/register', register);
//   server.use('/api/login', login);
//   server.use('/api/logout', logout);
// };
