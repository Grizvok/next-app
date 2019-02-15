//npm packages
const Router = require('express-promise-router');

//our packages
const db = require('../db/index');

const router = new Router();

router.get('/', async (req, res) => {
  const { q } = req.query;

  const userSearchResult = await db.query(
    'SELECT sci_user FROM users.client WHERE to_tsvector(sci_user) @@ to_tsquery($1)',
    [q]
  );

  const ticketSearchResult = await db.query(
    "SELECT id FROM users.ticket WHERE to_tsvector(ticket_title || '. ' || ticket_description) @@ to_tsquery($1)",
    [q]
  );

  const ticketResult = await Promise.all(
    ticketSearchResult.rows.map((res) => res.id)
  );
  const userResult = await Promise.all(
    userSearchResult.rows.map((res) => res.sci_user)
  );

  res.status(200).send({
    userSearchData: userResult,
    ticketSearchData: ticketResult,
  });
});

module.exports = router;
