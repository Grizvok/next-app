const create = require('./create');
const deleteComment = require('./delete');
const get = require('./get');
const update = require('./update');

module.exports = (server) => {
  server.use('/api/comment', create);
  server.use('/api/comment', get);
  server.use('/api/comment', update);
  server.use('/api/comment', deleteComment);
};
