// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!


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
    const email = document.getElementById("emailAddressInputLogin").value;
    const password = document.getElementById("passwordInputLogin").value;

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
