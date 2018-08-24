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
      "SELECT email FROM users.client WHERE email = $1",
      [id]
    );
    user = rows.rows[0].email;
  } catch (e) {
    done(e, false);
    return;
  }
  return done(null, user);
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      //find all users with matching login
      console.log("This ran 3");
      const users = await db.query(
        "SELECT email, hash FROM users.client WHERE email = $1",
        [email]
      );
      const user = users.rows[0].email;
      const hash = users.rows[0].hash;
      const hashStatus = await hasher.compareHash(password, hash);
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!hashStatus) {
        return done(null, false, { message: "Incorrect password." });
      }
      console.log(user);
      return done(null, user);
    }
  )
);

module.exports = passport;
