const create = require('./create');
const deleteTicket = require('./delete');
const get = require('./get');
const update = require('./update');


module.exports = (server) => {
  server.use('/api/ticket', create);
  server.use('/api/ticket', get);
  server.use('/api/ticket/', update);
  server.use('/api/ticket/', deleteTicket);
};