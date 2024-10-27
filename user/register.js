"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        clearErrors();
        // Perform validation
        const isUsernameValid = validateUsername(usernameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isPasswordValid = validatePassword(passwordInput.value);
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            const newUser = {
                username: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
            };
            // Retrieve existing users from localStorage or initialize with an empty array
            const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
            // Add the new user to the array
            existingUsers.push(newUser);
            // Save the updated array back to localStorage
            localStorage.setItem("users", JSON.stringify(existingUsers));
            // Display success message and redirect
            alert("Successfully registered!");
            window.location.href = "login.html";
        }
        else {
            if (!isUsernameValid)
                showError(usernameInput, "Username is required.");
            if (!isEmailValid)
                showError(emailInput, "Please enter a valid email address.");
            if (!isPasswordValid)
                showError(passwordInput, "Password must be at least 8 characters.");
        }
    });
    function validateUsername(username) {
        return username.trim().length > 0;
    }
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
        (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(error);
    }
    function clearErrors() {
        const errors = document.querySelectorAll(".error-message");
        errors.forEach((error) => error.remove());
        const inputs = document.querySelectorAll(".input-error");
        inputs.forEach((input) => input.classList.remove("input-error"));
    }
});
