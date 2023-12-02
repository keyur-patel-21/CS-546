// client_side_validation.js

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");
  const loginForm = document.getElementById("login-form");

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  function validateRegistrationForm() {
    const firstName = document.getElementById("firstNameInput").value;
    const lastName = document.getElementById("lastNameInput").value;
    const email = document.getElementById("emailAddressInput").value;
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById("confirmPasswordInput").value;
    const role = document.getElementById("roleInput").value;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
      displayError("All fields are required");
      return false;
    }

    if (!/^[a-zA-Z]{2,25}$/.test(firstName)) {
      displayError("Invalid firstNameInput");
      return false;
    }

    if (!/^[a-zA-Z]{2,25}$/.test(lastName)) {
      displayError("Invalid lastNameInput");
      return false;
    }

    if (!isValidEmail(email)) {
      displayError("Invalid emailAddressInput");
      return false;
    }

    if (!isValidPassword(password)) {
      displayError("Invalid passwordInput");
      return false;
    }

    if (password !== confirmPassword) {
      displayError("Password and confirmPassword do not match");
      return false;
    }

    if (role !== "admin" && role !== "user") {
      displayError("Invalid roleInput");
      return false;
    }

    // If all validations pass, allow the form to submit
    return true;
  }

  function validateLoginForm() {
    const email = document.getElementById("emailAddressInput").value;
    const password = document.getElementById("passwordInput").value;

    if (!email || !password) {
      displayError("Email address and password are required");
      return false;
    }

    if (!isValidEmail(email)) {
      displayError("Invalid email address format");
      return false;
    }

    // If all validations pass, allow the form to submit
    return true;
  }

  function displayError(message) {
    const errorElement = document.getElementById("error-message");
    errorElement.textContent = message;
  }

  registrationForm.addEventListener("submit", function (event) {
    if (!validateRegistrationForm()) {
      event.preventDefault(); // Prevent form submission
    }
  });

  loginForm.addEventListener("submit", function (event) {
    if (!validateLoginForm()) {
      event.preventDefault(); // Prevent form submission
    }
  });
});
