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

// our packages
const winston = require('./src/util/logger');
const setupAuthRoutes = require('./src/auth/index');
const setupVideoRoutes = require('./src/video/index');
const setupUserRoutes = require('./src/user/index');
const setupTicketRoutes = require('./src/ticket/index');
const setupFollowRoutes = require('./src/follow/index');
const setupSearchRoutes = require('./src/search');

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(morgan('combined', { stream: winston.stream }));

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieParser(process.env.SESSION_SECRET));
    server.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        secure: false,
        cookie: { secure: false },
      })
    );

    server.use(passport.initialize());
    server.use(passport.session());

    //setup auth routes
    setupAuthRoutes(server);
    //setup user routes
    setupUserRoutes(server);
    //setup video routes
    setupVideoRoutes(server);
    //setup ticket routes
    setupTicketRoutes(server);
    //setup follow routes
    setupFollowRoutes(server);
    //setup search routes
    setupSearchRoutes(server);

    //setup SSR routes
    server.get('/', (req, res) => {
      return app.render(req, res, '/', req.query);
    });

    server.get('/login', (req, res) => {
      return app.render(req, res, '/login', req.query);
    });

    server.get('/register', (req, res) => {
      return app.render(req, res, '/register', req.query);
    });

    server.get('/user/:id', (req, res) => {
      const queryParams = { id: req.params.id };
      return app.render(req, res, '/user', queryParams);
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
