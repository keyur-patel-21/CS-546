import { Router } from "express";
const router = Router();
import { registerUser, loginUser } from "../data/users.js";

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

router.route("/").get(async (req, res) => {
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/register")
  .get(async (req, res) => {
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

    if (!/^[a-zA-Z]{2,25}$/.test(firstNameInput)) {
      return res
        .status(400)
        .render("register", { error: "Invalid firstNameInput" });
    }

    if (!/^[a-zA-Z]{2,25}$/.test(lastNameInput)) {
      return res
        .status(400)
        .render("register", { error: "Invalid lastNameInput" });
    }

    if (!isValidEmail(emailAddressInput)) {
      return res
        .status(400)
        .render("register", { error: "Invalid emailAddressInput" });
    }

    if (!isValidPassword(passwordInput)) {
      return res
        .status(400)
        .render("register", { error: "Invalid passwordInput" });
    }

    if (passwordInput !== confirmPasswordInput) {
      return res.status(400).render("register", {
        error: "Password and confirmPassword do not match",
      });
    }

    if (roleInput !== "admin" && roleInput !== "user") {
      return res.status(400).render("register", { error: "Invalid roleInput" });
    }

    try {
      const result = await registerUser(
        firstNameInput,
        lastNameInput,
        emailAddressInput,
        passwordInput,
        roleInput
      );

      if (result.insertedUser) {
        res.redirect("/login");
      } else {
        res.status(500).send("Internal Server Error");
      }
    } catch (error) {
      res.status(400).render("register", { error: error.message });
    }
  });

router
  .route("/login")
  .get(async (req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    const { emailAddressInput, passwordInput } = req.body;
    if (!emailAddressInput || !passwordInput) {
      return res
        .status(400)
        .render("login", { error: "Email address and password are required" });
    }

    if (!isValidEmail(emailAddressInput)) {
      return res
        .status(400)
        .render("login", { error: "Invalid email address format" });
    }

    try {
      const user = await loginUser(
        emailAddressInput.toLowerCase(),
        passwordInput
      );

      if (user) {
        res.cookie("AuthState", true);

        req.session.user = {
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.email,
          role: user.role,
        };

        if (user.role === "admin") {
          res.redirect("/admin");
        } else {
          res.redirect("/protected");
        }
      } else {
        res
          .status(400)
          .render("login", { error: "Invalid email address and/or password" });
      }
    } catch (error) {
      res.status(400).render("login", { error: error.message });
    }
  });

router.route("/protected").get(async (req, res) => {
  res.render("protected");
});

router.route("/admin").get(async (req, res) => {
  res.render("admin");
});

router.route("/error").get(async (req, res) => {
  const statusCode = req.query.status || 500;
  const errorMessage = req.query.message || "Internal Server Error";

  res
    .status(statusCode)
    .render("error", { status: statusCode, message: errorMessage });
});

router.route("/logout").get(async (req, res) => {
  res.clearCookie("AuthState");

  res.render("logout", { message: "You have been successfully logged out." });
});

export default router;
