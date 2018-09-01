//npm packages
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

//our packages
const winston = require("./src/util/logger");
const setupAuthRoutes = require("./src/auth/index");
const setupVideoRoutes = require("./src/video/index");

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(morgan("combined", { stream: winston.stream }));

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(session({
      secret: "asfgaergadfvaerg",
      resave: true,
      saveUninitialized: true,
      secure: false
    }));

    server.use(passport.initialize());
    server.use(passport.session());

    //setup auth routes
    setupAuthRoutes(server);
    //setup video routes
    setupVideoRoutes(server);

    //setup SSR routes
    server.get("/", (req, res) => {
      return app.render(req, res, "/", req.query);
    });

    server.get("/login", (req, res) => {
      return app.render(req, res, "/login", req.query);
    });

    server.get("/register", (req, res) => {
      if (req.user) {
        console.log("This function ran");
        res.redirect('/dashboard');
      }
      return app.render(req, res, "/register", req.query);
    });

    server.get("/dashboard", (req, res) => {
      
      if (!req.user) {
        console.log("Hello!");
        return res.redirect('/register');
      }
      return app.render(req, res, "/dashboard", req.query);
    })
    
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  })