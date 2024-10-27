window.onload = (): void => {
  // 1. Retrieve the logged-in user's email from localStorage
  const loggedInEmail = localStorage.getItem("loggedInUser");

  // 2. Retrieve the array of all registered users from localStorage
  const storedUsers = localStorage.getItem("users");

  // Check if both values are retrieved successfully
  if (loggedInEmail && storedUsers) {
    // 3. Parse the users array from the JSON string
    const users: Array<{ username: string; email: string; password: string }> =
      JSON.parse(storedUsers);

    // 4. Find the user with the matching email
    let user: { username: string; email: string; password: string } | undefined;

    for (const u of users) {
      if (u.email === loggedInEmail) {
        user = u;
        break; // Stop searching once the user is found
      }
    }

    // 5. Check if the user was found and update the greeting message
    if (user) {
      const greetingElement = document.getElementById("greetingMessage");
      if (greetingElement) {
        greetingElement.innerText = `Welcome, ${user.username}!`;
      }
    } else {
      console.error("User not found");
    }
  } else {
    console.error("No logged-in user or no stored users found");
  }

  // 6. Add onclick event listeners for buttons
  const btnPage1 = document.getElementById(
    "btnPage1"
  ) as HTMLButtonElement | null;
  const btnPage2 = document.getElementById(
    "btnPage2"
  ) as HTMLButtonElement | null;

  if (btnPage1) {
    btnPage1.onclick = (): void => {
      window.location.href = "./addStudent.html";
    };
  }

  if (btnPage2) {
    btnPage2.onclick = (): void => {
      window.location.href = "./fetchStudent.html";
    };
  }
};
