window.onload = function () {
    // 1. Retrieve the logged-in user's email from localStorage
    var loggedInEmail = localStorage.getItem("loggedInUser");
    // 2. Retrieve the array of all registered users from localStorage
    var storedUsers = localStorage.getItem("users");
    // Check if both values are retrieved successfully
    if (loggedInEmail && storedUsers) {
        // 3. Parse the users array from the JSON string
        var users = JSON.parse(storedUsers);
        // 4. Find the user with the matching email
        var user = void 0;
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var u = users_1[_i];
            if (u.email === loggedInEmail) {
                user = u;
                break; // Stop searching once the user is found
            }
        }
        // 5. Check if the user was found and update the greeting message
        if (user) {
            var greetingElement = document.getElementById("greetingMessage");
            if (greetingElement) {
                greetingElement.innerText = "Welcome, ".concat(user.username, "!");
            }
        }
        else {
            console.error("User not found");
        }
    }
    else {
        console.error("No logged-in user or no stored users found");
    }
    // 6. Add onclick event listeners for buttons
    var btnPage1 = document.getElementById("btnPage1");
    var btnPage2 = document.getElementById("btnPage2");
    if (btnPage1) {
        btnPage1.onclick = function () {
            window.location.href = "./addStudent.html";
        };
    }
    if (btnPage2) {
        btnPage2.onclick = function () {
            window.location.href = "./fetchStudent.html";
        };
    }
};
