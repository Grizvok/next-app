// npm packages
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis').createClient();

// our packages
const winston = require('./src/util/logger');
const setupAuthRoutes = require('./src/auth');
const setupVideoRoutes = require('./src/video');
const setupUserRoutes = require('./src/user');
const setupTicketRoutes = require('./src/ticket');
const setupFollowRoutes = require('./src/follow');
const setupSearchRoutes = require('./src/search');
const setupCommentRoutes = require('./src/comment');

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(morgan('combined', { stream: winston.stream }));

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    // we use the session secret for cookie-parser to keep the secret consistent between it and express-session or else errors can occur
    server.use(cookieParser(process.env.SESSION_SECRET));
    server.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        store: new RedisStore({ host: 'localhost', port: 6379, client: redis }),
        saveUninitialized: false,
        secure: false,
        cookie: { secure: false },
      })
    );

    server.use(passport.initialize());
    server.use(passport.session());

    setupAuthRoutes(server);

    setupUserRoutes(server);

    setupVideoRoutes(server);

    setupTicketRoutes(server);

    setupFollowRoutes(server);

    setupSearchRoutes(server);

    setupCommentRoutes(server);

    // setup SSR routes
    server.get('/', (req, res) => {
      return app.render(req, res, '/', req.query);
    });

    server.get('/login', (req, res) => {
      return app.render(req, res, '/login', req.query);
    });

    server.get('/submit', (req, res) => {
      if (!req.user) {
        res.redirect('/login');
        return;
      }
      return app.render(req, res, '/submit');
    });

    server.get('/register', (req, res) => {
      if (req.user) {
        res.redirect(`/user/${req.user.sci_user}`);
        return;
      }
      return app.render(req, res, '/register', req.query);
    });

    server.get('/user/:id', (req, res) => {
      const queryParams = { id: req.params.id };
      return app.render(req, res, '/user', queryParams);
    });

    server.get('/user/:id/comments', (req, res) => {
      const queryParams = { id: req.params.id };
      return app.render(req, res, '/user/comments', queryParams);
    });

    server.get('/user/:id/tickets', (req, res) => {
      const queryParams = { id: req.params.id };
      return app.render(req, res, '/user/tickets', queryParams);
    });

    server.get('/user/:id/skills', (req, res) => {
      const queryParams = { id: req.params.id };
      return app.render(req, res, '/user/skills', queryParams);
    });

    server.get('/ticket/:id', (req, res) => {
      const actualPage = '/ticket';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
