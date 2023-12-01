//import express, express router as shown in lecture code
import { Router } from "express";
const router = Router();
import { registerUser, loginUser } from "../data/index.js";

// Function to validate email address format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate password format
function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

router.route("/").get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/register")
  .get(async (req, res) => {
    //code here for GET
    res.render("register");
  })
  .post(async (req, res) => {
    const {
      firstNameInput,
      lastNameInput,
      emailAddressInput,
      passwordInput,
      confirmPasswordInput,
      roleInput,
    } = req.body;

    // Check if required fields are present
    if (
      !firstNameInput ||
      !lastNameInput ||
      !emailAddressInput ||
      !passwordInput ||
      !confirmPasswordInput ||
      !roleInput
    ) {
      return res
        .status(400)
        .render("register", { error: "All fields are required" });
    }

    // Validate firstNameInput
    if (!/^[a-zA-Z]{2,25}$/.test(firstNameInput)) {
      return res
        .status(400)
        .render("register", { error: "Invalid firstNameInput" });
    }

    // Validate lastNameInput
    if (!/^[a-zA-Z]{2,25}$/.test(lastNameInput)) {
      return res
        .status(400)
        .render("register", { error: "Invalid lastNameInput" });
    }

    // Validate emailAddressInput
    if (!isValidEmail(emailAddressInput)) {
      return res
        .status(400)
        .render("register", { error: "Invalid emailAddressInput" });
    }

    // Validate passwordInput
    if (!isValidPassword(passwordInput)) {
      return res
        .status(400)
        .render("register", { error: "Invalid passwordInput" });
    }

    // Confirm password match
    if (passwordInput !== confirmPasswordInput) {
      return res
        .status(400)
        .render("register", {
          error: "Password and confirmPassword do not match",
        });
    }

    // Validate roleInput
    if (roleInput !== "admin" && roleInput !== "user") {
      return res.status(400).render("register", { error: "Invalid roleInput" });
    }

    try {
      // Call your registerUser db function passing in the fields from the request.body
      const result = await registerUser({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailAddressInput,
        password: passwordInput,
        role: roleInput,
      });

      // Check if the DB function returns {insertedUser: true}
      if (result.insertedUser) {
        // Redirect to the /login page
        res.redirect("/login");
      } else {
        // Respond with a status code of 500 and an error message
        res.status(500).send("Internal Server Error");
      }
    } catch (error) {
      // Render the sign-up screen with an error message and an HTTP 400 status code
      res.status(400).render("register", { error: error.message });
    }
  });

router
  .route("/login")
  .get(async (req, res) => {
    // Code here for GET
    res.render("login");
  })
  .post(async (req, res) => {
    const { emailAddressInput, passwordInput } = req.body;

    // Check if required fields are present
    if (!emailAddressInput || !passwordInput) {
      return res
        .status(400)
        .render("login", { error: "Email address and password are required" });
    }

    // Validate emailAddressInput
    if (!isValidEmail(emailAddressInput)) {
      return res
        .status(400)
        .render("login", { error: "Invalid email address format" });
    }

    try {
      // Call your loginUser db function passing in the emailAddressInput and passwordInput from the request.body
      const user = await loginUser(
        emailAddressInput.toLowerCase(),
        passwordInput
      );

      // Check if the DB function returns the user
      if (user) {
        // Set cookie named AuthState
        res.cookie("AuthState", true);

        // Store user information in req.session.user
        req.session.user = {
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.email,
          role: user.role,
        };

        // Redirect based on user role
        if (user.role === "admin") {
          res.redirect("/admin");
        } else {
          res.redirect("/protected");
        }
      } else {
        // Render the login screen with an error message and an HTTP 400 status code
        res
          .status(400)
          .render("login", { error: "Invalid email address and/or password" });
      }
    } catch (error) {
      // Render the login screen with an error message and an HTTP 400 status code
      res.status(400).render("login", { error: error.message });
    }
  });

router.route("/protected").get(async (req, res) => {
  //code here for GET
  res.render("protected");
});

router.route("/admin").get(async (req, res) => {
  //code here for GET
  res.render("admin");
});

router.route('/error').get(async (req, res) => {
  // Extract status code and error message from the query parameters or use defaults
  const statusCode = req.query.status || 500;
  const errorMessage = req.query.message || 'Internal Server Error';

  // Render the error view with the provided status code and error message
  res.status(statusCode).render('error', { status: statusCode, message: errorMessage });
});


router.route('/logout').get(async (req, res) => {
  // Expire/delete the AuthState cookie
  res.clearCookie('AuthState');

  // Inform the user that they have been logged out
  res.render('logout', { message: 'You have been successfully logged out.' });
});

//export router
export default router;
