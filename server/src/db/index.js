const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'grizvok',
    password : 'grizvok5',
    database : 'scisport'
  }
});

export default knex;
