window.addEventListener("load", function () {
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
    clearError(registrationForm);

    const firstName = document.getElementById("firstNameInput").value;
    const lastName = document.getElementById("lastNameInput").value;
    const email = document.getElementById("emailAddressInput").value;
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById("confirmPasswordInput").value;
    const role = document.getElementById("roleInput").value;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
      displayError(registrationForm, "All fields are required");
      return false;
    }

    if (!/^[a-zA-Z]{2,25}$/.test(firstName)) {
      displayError(registrationForm, "Invalid first name");
      return false;
    }

    if (!/^[a-zA-Z]{2,25}$/.test(lastName)) {
      displayError(registrationForm, "Invalid last name");
      return false;
    }

    if (!isValidEmail(email)) {
      displayError(registrationForm, "Invalid email address format");
      return false;
    }

    if (!isValidPassword(password)) {
      displayError(registrationForm, "Invalid password");
      return false;
    }

    if (password !== confirmPassword) {
      displayError(registrationForm, "Password and confirmPassword do not match");
      return false;
    }

    if (role !== "admin" && role !== "user") {
      displayError(registrationForm, "Invalid role");
      return false;
    }

    // If all validations pass, allow the form to submit
    return true;
  }

  function validateLoginForm() {
    clearError(loginForm);

    const email = document.getElementById("emailAddressInput").value;
    const password = document.getElementById("passwordInput").value;

    if (!email || !password) {
      displayError(loginForm, "Email address and password are required");
      return false;
    }

    if (!isValidEmail(email)) {
      displayError(loginForm, "Invalid email address format");
      return false;
    }

    // If all validations pass, allow the form to submit
    return true;
  }

  function displayError(form, message) {
    const errorElement = form.querySelector(".error-message");
    errorElement.textContent = message;
  }

  function clearError(form) {
    const errorElement = form.querySelector(".error-message");
    errorElement.textContent = "";
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
