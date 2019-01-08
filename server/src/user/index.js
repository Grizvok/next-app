const get = require('./get');
const update = require('./update');
const follow = require('./follow');

module.exports = (server) => {
  server.use('/api/user/', get);
  server.use('/api/user/follow/', follow);
};