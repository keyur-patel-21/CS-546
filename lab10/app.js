// Setup server, session and middleware here.
import express from "express";
const app = express();
import session from "express-session";
import exphbs from "express-handlebars";
import configRoutes from "./routes/index.js";

app.use(express.json());
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

// You will have the following middleware functions:

// 1. This middleware will apply to the root route / (note, a middleware applying to the root route is the same as a middleware that fires for every request) and will do one of the following:

// A. This middleware will log to your console for every request made to the server, with the following information:

// Current Timestamp: new Date().toUTCString()
// Request Method: req.method
// Request Route: req.originalUrl
// Some string/boolean stating if a user is authenticated
// There is no precise format you must follow for this. The only requirement is that it logs the data stated above.

// An example would be:

// [Sun, 14 Apr 2019 23:56:06 GMT]: GET / (Non-Authenticated User)
// [Sun, 14 Apr 2019 23:56:14 GMT]: POST /login (Non-Authenticated User)
// [Sun, 14 Apr 2019 23:56:19 GMT]: GET /protected (Authenticated User)
// [Sun, 14 Apr 2019 23:56:44 GMT]: GET / (Authenticated User)
// B. After you log the request info in step A,  if the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /protected route. If the user is NOT authenticated, you will redirect them to the GET /login route.

app.use((req, res, next) => {
  // Log request information
  const timestamp = new Date().toUTCString();
  const isAuthenticated = req.session.user ? true : false;
  const userRole = req.session.user
    ? req.session.user.role
    : "Non-Authenticated User";

  console.log(`[${timestamp}]: ${req.method} ${req.originalUrl} (${userRole})`);

  // Redirect based on user role if authenticated
  if (isAuthenticated) {
    if (req.session.user.role === "admin") {
      return res.redirect("/admin");
    } else if (req.session.user.role === "user") {
      return res.redirect("/protected");
    }
  } else {
    // Redirect to login if not authenticated
    return res.redirect("/login");
  }

  // Continue to the next middleware or route
  next();
});

// 2. This middleware will only be used for the GET /login route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /protected route. If the user is NOT authenticated, you will allow them to get through to the GET /login route. A logged in user should never be able to access the login form.

app.get("/login", (req, res, next) => {
  // Redirect based on user role if authenticated
  if (req.session.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/admin");
    } else if (req.session.user.role === "user") {
      return res.redirect("/protected");
    }
  }

  // Continue to the GET /login route for unauthenticated or unexpected scenarios
  next();
});

//  3. This middleware will only be used for the GET /register route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /protected route. If the user is NOT authenticated, you will allow them to get through to the GET /register route. A logged in user should never be able to access the registration form.

app.get("/register", (req, res, next) => {
  // Redirect to /register if not authenticated
  if (!req.session.user) {
    return res.redirect("/register");
  }

  // Redirect based on user role if authenticated
  if (req.session.user.role === "admin") {
    return res.redirect("/admin");
  } else if (req.session.user.role === "user") {
    return res.redirect("/protected");
  }

  // Continue to the GET /register route for unexpected scenarios
  next();
});

// 4. This middleware will only be used for the GET /protected route and will do one of the following:

// If a user is not logged in, you will redirect to the GET /login route.
// If the user is logged in, the middleware will "fall through" to the next route calling the next() callback.
// Users with both roles admin or user should be able to access the /protected route, so you simply need to make sure they are authenticated in this middleware.

app.get("/protected", (req, res, next) => {
  // Redirect to /login if not authenticated
  if (!req.session.user) {
    return res.redirect("/login");
  }

  // Continue to the next route for authenticated users
  next();
});

// 5. This middleware will only be used for the GET /admin route and will do one of the following:

// If a user is not logged in, you will redirect to the GET /login route.
// If a user is logged in, but they are not an admin user, you will redirect to /error and render a HTML error page saying that the user does not have permission to view the page, and the page must issue an HTTP status code of 403.
// If the user is logged in AND the user has a role of admin, the middleware will "fall through" to the next route calling the next() callback.
// ONLY USERS WITH A ROLE of admin SHOULD BE ABLE TO ACCESS THE /admin ROUTE!

app.get("/admin", (req, res, next) => {
  // Redirect to /login if not authenticated
  if (!req.session.user) {
    return res.redirect("/login");
  }

  // Check if the user has admin role
  if (req.session.user.role !== "admin") {
    // Redirect to /error with status code 403 for non-admin users
    return res.status(403).render("error", {
      status: 403,
      message: "Permission Denied: User does not have admin privileges",
    });
  }

  // Continue to the next route for admin users
  next();
});

// 6. This middleware will only be used for the GET /logout route and will do one of the following:

// 1. If a user is not logged in, you will redirect to the GET /login route.

// 2. if the user is logged in, the middleware will "fall through" to the next route calling the next() callback.

app.get("/logout", (req, res, next) => {
  // Redirect to /login if not authenticated
  if (!req.session.user) {
    return res.redirect("/login");
  }

  // Continue to the next route for logged-in users
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
