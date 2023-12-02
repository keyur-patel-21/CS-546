import express from "express";
const app = express();
import session from "express-session";
import configRoutes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import exphbs from "express-handlebars";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + "/public");

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  next();
};

app.use("/public", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthState",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  const timestamp = new Date().toUTCString();
  const isAuthenticated = req.session.user ? true : false;
  const userRole = req.session.user
    ? req.session.user.role
    : "Non-Authenticated User";

  console.log(`[${timestamp}]: ${req.method} ${req.originalUrl} (${userRole})`);

  if (req.originalUrl === "/login" || req.originalUrl === "/register") {
    return next();
  }

  if (isAuthenticated) {
    if (req.session.user.role === "admin") {
      return res.redirect("/admin");
    } else if (req.session.user.role === "user") {
      return res.redirect("/protected");
    }
  } else {
    return res.redirect("/login");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.get("/login", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/admin");
    } else if (req.session.user.role === "user") {
      return res.redirect("/protected");
    }
  }

  next();
});

app.get("/register", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/admin");
    } else if (req.session.user.role === "user") {
      return res.redirect("/protected");
    }
  }

  next();
});

app.get("/protected", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  next();
});

app.get("/admin", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  if (req.session.user.role !== "admin") {
    return res.status(403).render("error", {
      status: 403,
      message: "Permission Denied: User does not have admin privileges",
    });
  }

  next();
});

app.get("/logout", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
