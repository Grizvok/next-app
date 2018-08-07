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
      resave: false,
      saveUninitialized: true,
      secure: false
    }));

    server.use(passport.initialize());
    server.use(passport.session());

    //setup auth routes
    setupAuthRoutes(server);

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