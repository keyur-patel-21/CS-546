import { Router } from "express";
const router = Router();
import { registerUser, loginUser } from "../data/users.js";

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i; 
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
    res.render("register", { title: "Sign up" });
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

    const trimmedFirstName = firstNameInput.trim();
    const trimmedLastName = lastNameInput.trim();
    const trimmedEmailAddress = emailAddressInput.trim();
    const trimmedPassword = passwordInput.trim();
    const trimmedConfirmPassword = confirmPasswordInput.trim();
    const trimmedRole = roleInput.trim();

    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedEmailAddress ||
      !trimmedPassword ||
      !trimmedConfirmPassword ||
      !trimmedRole
    ) {
      return res
        .status(400)
        .render("register", { error: "All fields are required" });
    }

    if (!/^[a-zA-Z]{2,25}$/.test(trimmedFirstName)) {
      return res
        .status(400)
        .render("register", { error: "Invalid firstNameInput" });
    }

    if (!/^[a-zA-Z]{2,25}$/.test(trimmedLastName)) {
      return res
        .status(400)
        .render("register", { error: "Invalid lastNameInput" });
    }

    if (!isValidEmail(trimmedEmailAddress)) {
      return res
        .status(400)
        .render("register", { error: "Invalid emailAddressInput" });
    }

    if (!isValidPassword(trimmedPassword)) {
      return res
        .status(400)
        .render("register", { error: "Invalid passwordInput" });
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      return res.status(400).render("register", {
        error: "Password and confirmPassword do not match",
      });
    }

    if (trimmedRole !== "admin" && trimmedRole !== "user") {
      return res.status(400).render("register", { error: "Invalid roleInput" });
    }

    try {
      const result = await registerUser(
        trimmedFirstName,
        trimmedLastName,
        trimmedEmailAddress,
        trimmedPassword,
        trimmedRole
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
    res.render("login", { title: "Login Page" });
  })
  .post(async (req, res) => {
    const { emailAddressInput, passwordInput } = req.body;

    const trimmedEmailAddress = emailAddressInput.trim();
    const trimmedPassword = passwordInput.trim();

    if (!trimmedEmailAddress || !trimmedPassword) {
      return res
        .status(400)
        .render("login", { error: "Email address and password are required" });
    }

    if (!isValidEmail(trimmedEmailAddress)) {
      return res
        .status(400)
        .render("login", { error: "Invalid email address format" });
    }

    try {
      const user = await loginUser(
        trimmedEmailAddress.toLowerCase(),
        trimmedPassword
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
  if (req.session.user.role === "admin") {
    res.render("protected", {
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      currentTime: new Date(),
      role: req.session.user.role,
      isAdmin: true,
      title: "Welcome Page",
    });
  }else{
    res.render("protected", {
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      currentTime: new Date(),
      role: req.session.user.role,
      isAdmin: false,
      title: "Welcome Page",
    });
  }
});

router.route("/admin").get(async (req, res) => {
  res.render("admin", {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    currentTime: new Date(),
    role: req.session.user.role,
    title: "Welcome Admin",
  });
});

router.route("/error").get(async (req, res) => {
  const statusCode = req.query.status || 500;
  const errorMessage = req.query.message || "Internal Server Error";

  res
    .status(statusCode)
    .render("error", {
      status: statusCode,
      message: errorMessage,
      title: "Error",
    });
});

router.route("/logout").get(async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.status(200).render("logout", { title: "Logout" });
  }
});

export default router;
