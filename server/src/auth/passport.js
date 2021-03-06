//npm packages
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

//our packages
const db = require('../db/index');
const hasher = require('../util/hash');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  let user = null;
  try {
    const rows = await db.query(
      'SELECT sci_user, id FROM users.client WHERE sci_user = $1',
      [id]
    );
    return done(null, rows.rows[0]);
  } catch (e) {
    done(e, false);
    return;
  }
});

passport.use(
  new LocalStrategy({ usernameField: 'user' }, async (user, password, done) => {
    //find all users with matching login
    const users = await db.query(
      'SELECT sci_user, hash FROM users.client WHERE sci_user = $1',
      [user]
    );
    const username = users.rows[0].sci_user;
    const hash = users.rows[0].hash;
    const hashStatus = await hasher.compareHash(password, hash);
    if (!username) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!hashStatus) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, username);
  })
);

const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

//implementation of json web tokens
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    let user;
    try {
      const rows = await db.query(
        'SELECT sci_user, id FROM users.client WHERE sci_user = $1',
        [jwt_payload]
      );
      user = rows.rows[0];
    } catch (e) {
      return done(e, false);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  })
);

module.exports = passport;
