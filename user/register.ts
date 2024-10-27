document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById(
    "registerForm"
  ) as HTMLFormElement;
  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;

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
      const existingUsers = JSON.parse(
        localStorage.getItem("users") || "[]"
      ) as Array<{
        username: string;
        email: string;
        password: string;
      }>;

      // Add the new user to the array
      existingUsers.push(newUser);

      // Save the updated array back to localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Display success message and redirect
      alert("Successfully registered!");
      window.location.href = "login.html";
    } else {
      if (!isUsernameValid) showError(usernameInput, "Username is required.");
      if (!isEmailValid)
        showError(emailInput, "Please enter a valid email address.");
      if (!isPasswordValid)
        showError(passwordInput, "Password must be at least 8 characters.");
    }
  });

  function validateUsername(username: string): boolean {
    return username.trim().length > 0;
  }

  function validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  function showError(input: HTMLInputElement, message: string): void {
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    input.classList.add("input-error");
    input.parentElement?.appendChild(error);
  }

  function clearErrors(): void {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach((error) => error.remove());

    const inputs = document.querySelectorAll(".input-error");
    inputs.forEach((input) => input.classList.remove("input-error"));
  }
});
