document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("loginForm");
  var emailInput = document.getElementById("loginEmail");
  var passwordInput = document.getElementById("loginPassword");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();
    var emailValid = validateEmail(emailInput.value);
    var passwordValid = validatePassword(passwordInput.value);
    if (emailValid && passwordValid) {
      var storedData = localStorage.getItem("userData");
      if (storedData) {
        var userData = JSON.parse(storedData);
        if (
          emailInput.value === userData.email &&
          passwordInput.value === userData.password
        ) {
          alert("Login successful!");
          // Redirect to the desired page
          window.location.href = "../student/student.html"; // Change this URL to your preferred page
        } else {
          showError(emailInput, "Incorrect email or password.");
          showError(passwordInput, "Incorrect email or password.");
        }
      } else {
        alert("No user data found. Please register first.");
      }
    } else {
      if (!emailValid) {
        showError(emailInput, "Please enter a valid email address.");
      }
      if (!passwordValid) {
        showError(passwordInput, "Password must be at least 8 characters.");
      }
    }
  });
  function validateEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  function validatePassword(password) {
    return password.length >= 8;
  }
  function showError(input, message) {
    var _a;
    var error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    input.classList.add("input-error");
    (_a = input.parentElement) === null || _a === void 0
      ? void 0
      : _a.appendChild(error);
  }
  function clearErrors() {
    var errors = document.querySelectorAll(".error-message");
    errors.forEach(function (error) {
      return error.remove();
    });
    var inputs = document.querySelectorAll(".input-error");
    inputs.forEach(function (input) {
      return input.classList.remove("input-error");
    });
  }
});
