"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    const emailValid = validateEmail(emailInput.value);
    const passwordValid = validatePassword(passwordInput.value);
    if (emailValid && passwordValid) {
      // Retrieve the array of users from localStorage
      const storedData = localStorage.getItem("users");
      if (storedData) {
        const users = JSON.parse(storedData);
        // Find a user with matching email and password
        const user = users.find(
          (u) =>
            u.email === emailInput.value && u.password === passwordInput.value
        );
        if (user) {
          alert(`Welcome, ${user.username}!`);
          localStorage.setItem("loggedInUser", user.email);
          // Redirect to the desired page
          window.location.href = "../student/student.html";
        } else {
          showError(emailInput, "Incorrect email or password.");
          showError(passwordInput, "Incorrect email or password.");
        }
      } else {
        alert("No users found. Please register first.");
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  function validatePassword(password) {
    return password.length >= 8;
  }
  function showError(input, message) {
    var _a;
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    input.classList.add("input-error");
    (_a = input.parentElement) === null || _a === void 0
      ? void 0
      : _a.appendChild(error);
  }
  function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach((error) => error.remove());
    const inputs = document.querySelectorAll(".input-error");
    inputs.forEach((input) => input.classList.remove("input-error"));
  }
});
