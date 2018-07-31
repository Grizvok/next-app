const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/index");

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  let user = null;

  try {
    const rows = await db.query(
      "SELECT email FROM users.client WHERE email = $1",
      [id]
    );
    user = rows.rows[0].email;
  } catch (e) {
    done(e, false);
    return;
  }
  done(null, user);
});

passport.use(
  new LocalStrategy(async (email, password, done) => {
    //find all users with matching login
    const users = await db.query(
      "SELECT email, password FROM users.client WHERE email = $1",
      [email]
    );
    const user = users.rows[0];
    const hash = users.rows[0];
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (hash) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

module.exports = passport;
