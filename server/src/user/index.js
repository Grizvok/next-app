const get = require('./get');
const update = require('./update');

module.exports = (server) => {
  server.use('/api/user/', get);
};