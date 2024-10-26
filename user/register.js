document.addEventListener("DOMContentLoaded", function () {
    var registerForm = document.getElementById("registerForm");
    var usernameInput = document.getElementById("username");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();
        // Perform validation
        var isUsernameValid = validateUsername(usernameInput.value);
        var isEmailValid = validateEmail(emailInput.value);
        var isPasswordValid = validatePassword(passwordInput.value);
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            // Save data to localStorage
            var userData = {
                username: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            // Display success message
            alert("Successfully registered!");
            // Redirect to login page
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
        (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(error);
    }
    function clearErrors() {
        var errors = document.querySelectorAll(".error-message");
        errors.forEach(function (error) { return error.remove(); });
        var inputs = document.querySelectorAll(".input-error");
        inputs.forEach(function (input) { return input.classList.remove("input-error"); });
    }
});
