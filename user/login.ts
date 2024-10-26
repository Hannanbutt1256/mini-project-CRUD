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
      const storedData = localStorage.getItem("userData");

      if (storedData) {
        const userData = JSON.parse(storedData);

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
