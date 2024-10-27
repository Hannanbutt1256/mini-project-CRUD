document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm") as HTMLFormElement;
  const emailInput = document.getElementById("loginEmail") as HTMLInputElement;
  const passwordInput = document.getElementById(
    "loginPassword"
  ) as HTMLInputElement;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const emailValid = validateEmail(emailInput.value);
    const passwordValid = validatePassword(passwordInput.value);

    if (emailValid && passwordValid) {
      // Retrieve the array of users from localStorage
      const storedData = localStorage.getItem("users");

      if (storedData) {
        const users = JSON.parse(storedData) as Array<{
          username: string;
          email: string;
          password: string;
        }>;

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