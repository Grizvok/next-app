//npm packages
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//our packages
const db = require("../db/index");
const hasher = require("../util/hash");

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser(async (id, done) => {
  let user = null;
  try {
    const rows = await db.query(
      "SELECT sci_user FROM users.client WHERE sci_user = $1",
      [id]
    );
    user = rows.rows[0].sci_user;
  } catch (e) {
    done(e, false);user
    return;
  }
  return done(null, user);
});

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (user, password, done) => {
      //find all users with matching login
      const users = await db.query(
        "SELECT sci_user, hash FROM users.client WHERE sci_user = $1",
        [user]
      );
      const username = users.rows[0].user;
      const hash = users.rows[0].hash;
      const hashStatus = await hasher.compareHash(password, hash);
      if (!username) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!hashStatus) {
        return done(null, false, { message: "Incorrect password." });
      }
    
      return done(null, username);
    }
  )
);

module.exports = passport;
