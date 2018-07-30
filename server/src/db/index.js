const { Pool } = require("pg");

const pool = new Pool({
  user: "grizvok",
  password: "grizvok5",
  host: "localhost",
  database: "scisport",
  port: 5432
});

module.exports = {
  query: (text, params) => pool.query(text, params)
}
