const search = require('./search');

module.exports = (server) => {
  server.use('/api/search', search);
};
