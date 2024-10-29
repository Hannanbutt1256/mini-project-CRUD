var _a, _b, _c, _d, _e, _f, _g;
let usersData = JSON.parse(localStorage.getItem("usersData") || "[]");
let formData = {
    personalInfo: { firstName: "", lastName: "", email: "" },
    contactInfo: { phoneNumber: "", address: "", postalCode: "" },
    education: { institute: "", educationLevel: "", grades: "" },
};
let currentStep = 1; // Start from step 1
let currentCircle = 1;
// Get all step containers and the submit button
const steps = document.querySelectorAll(".stp");
const circle = document.querySelectorAll(".step");
const submitButton = document.querySelector("#submit-btn");
// Function to show the current step and hide others
// Function to switch between steps and hide inactive ones
function showStep(step) {
    // Ensure the step is within the valid range
    if (step < 1 || step > steps.length)
        return;
    // Loop through all steps to toggle visibility
    steps.forEach((el, index) => {
        if (index === step - 1) {
            el.classList.add("active"); // Show the active step
            el.style.display = "block"; // Ensure it is visible
        }
        else {
            el.classList.remove("active"); // Remove active class from other steps
            el.style.display = "none"; // Hide other steps
        }
    });
    // Update the current step number
    currentStep = step;
}
function showCircle(step) {
    // Ensure the step is within valid range
    if (step < 1 || step > steps.length)
        return;
    // Hide all steps initially
    circle.forEach((el) => el.classList.remove("active"));
    // Show the current step
    circle[step - 1].classList.add("active");
    // Update the current step
    currentCircle = step;
}
// Save form data to localStorage
function saveDataToLocalStorage() {
    const existingUserIndex = usersData.findIndex((user) => user.personalInfo.email === formData.personalInfo.email // Unique key is email
    );
    if (existingUserIndex >= 0) {
        // Update existing user's data
        usersData[existingUserIndex] = { ...formData };
    }
    else {
        // Add new user data if not found
        usersData.push({ ...formData });
    }
    // Save the updated array to localStorage
    localStorage.setItem("usersData", JSON.stringify(usersData));
}
// Populate form fields with saved data from localStorage
function populateFields() {
    document.getElementById("first-name").value =
        formData.personalInfo.firstName;
    document.getElementById("last-name").value =
        formData.personalInfo.lastName;
    document.getElementById("email").value =
        formData.personalInfo.email;
    document.getElementById("phone-number").value =
        formData.contactInfo.phoneNumber;
    document.getElementById("address").value =
        formData.contactInfo.address;
    document.getElementById("postal-code").value =
        formData.contactInfo.postalCode;
    document.getElementById("institute").value =
        formData.education.institute;
    document.getElementById("education-level").value =
        formData.education.educationLevel;
    document.getElementById("grades").value =
        formData.education.grades;
}
function populateReviewStep() {
    document.getElementById("review-first-name").innerText =
        formData.personalInfo.firstName;
    document.getElementById("review-last-name").innerText =
        formData.personalInfo.lastName;
    document.getElementById("review-email").innerText =
        formData.personalInfo.email;
    document.getElementById("review-phone-number").innerText =
        formData.contactInfo.phoneNumber;
    document.getElementById("review-address").innerText =
        formData.contactInfo.address;
    document.getElementById("review-postal-code").innerText =
        formData.contactInfo.postalCode;
    document.getElementById("review-institute").innerText =
        formData.education.institute;
    document.getElementById("review-education-level").innerText =
        formData.education.educationLevel;
    document.getElementById("review-grades").innerText =
        formData.education.grades;
}
// Validate each step’s data before proceeding
function validatePersonalInfo() {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    // Regular expressions for validation
    const namePattern = /^[A-Za-z]+$/; // Only allows alphabets
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    // Check for empty fields
    if (!firstName || !lastName || !email) {
        alert("Please fill out all personal info fields.");
        return false;
    }
    // Validate first and last names (only alphabets, no spaces or special characters)
    if (!namePattern.test(firstName)) {
        alert("First name should only contain alphabets.");
        return false;
    }
    if (!namePattern.test(lastName)) {
        alert("Last name should only contain alphabets.");
        return false;
    }
    // Validate email format
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    formData.personalInfo = { firstName, lastName, email };
    return true;
}
function validateContactInfo() {
    const phoneNumber = document.getElementById("phone-number").value.trim();
    const address = document.getElementById("address").value.trim();
    const postalCode = document.getElementById("postal-code").value.trim();
    // Regular expressions for validation
    const phonePattern = /^\+?[0-9\s\-()]{7,15}$/; // Allows optional +, spaces, dashes, and numbers (7-15 digits)
    const postalCodePattern = /^[A-Za-z0-9\s\-]{3,10}$/; // Supports numeric and alphanumeric postal codes
    const addressPattern = /^[A-Za-z0-9\s,'-]{5,100}$/; // Alphanumeric, spaces, commas, hyphens allowed
    // Check for empty fields
    if (!phoneNumber || !address || !postalCode) {
        alert("Please fill out all contact info fields.");
        return false;
    }
    // Validate phone number (optional country code + 7-15 digits)
    if (!phonePattern.test(phoneNumber)) {
        alert("Please enter a valid phone number (e.g., +1-555-555-5555).");
        return false;
    }
    // Validate address (5-100 characters, alphanumeric + common symbols)
    if (!addressPattern.test(address)) {
        alert("Please enter a valid address (alphanumeric, spaces, commas, hyphens allowed).");
        return false;
    }
    // Validate postal code (3-10 characters, alphanumeric)
    if (!postalCodePattern.test(postalCode)) {
        alert("Please enter a valid postal code.");
        return false;
    }
    // If all validations pass, update form data
    formData.contactInfo = { phoneNumber, address, postalCode };
    return true;
}
function validateEducation() {
    const institute = document.getElementById("institute").value.trim();
    const educationLevel = document.getElementById("education-level").value.trim();
    const grades = document.getElementById("grades").value.trim();
    // Regular expressions for validation
    const institutePattern = /^[A-Za-z\s'.-]{2,100}$/; // Allows letters, spaces, apostrophes, periods, and hyphens
    const gradePattern = /^([A-F][+-]?|[0-9]{1,3}(\.\d{1,2})?)$/; // Allows grades A-F or numeric (0-100 or with decimal)
    // Check for empty fields
    if (!institute || !educationLevel || !grades) {
        alert("Please fill out all education fields.");
        return false;
    }
    // Validate institute name (2-100 characters)
    if (!institutePattern.test(institute)) {
        alert("Please enter a valid institute name (letters, spaces, apostrophes, periods, hyphens allowed).");
        return false;
    }
    // Validate education level (must be a recognized level)
    const validEducationLevels = [
        "elementary",
        "secondary",
        "undergrad",
        "grad",
        "Diploma",
    ];
    if (!validEducationLevels.includes(educationLevel)) {
        alert(`Please select a valid education level: ${validEducationLevels.join(", ")}.`);
        return false;
    }
    // Validate grades (A-F or numeric scale)
    if (!gradePattern.test(grades)) {
        alert("Please enter valid grades (e.g., A+, B-, 85, 92.5).");
        return false;
    }
    // If all validations pass, update form data
    formData.education = {
        institute,
        educationLevel,
        grades,
    };
    return true;
}
// Event listeners for step navigation
(_a = document.getElementById("next-btn-1")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    if (validatePersonalInfo()) {
        saveDataToLocalStorage();
        showStep(currentStep + 1);
        showCircle(currentCircle + 1);
    }
});
(_b = document.getElementById("next-btn-2")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    if (validateContactInfo()) {
        saveDataToLocalStorage();
        showStep(currentStep + 1);
        showCircle(currentCircle + 1);
    }
});
(_c = document.getElementById("next-btn-3")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    if (validateEducation()) {
        saveDataToLocalStorage();
        populateReviewStep();
        showStep(currentStep + 1);
        showCircle(currentCircle + 1);
    }
});
// Previous step buttons
(_d = document.getElementById("prev-btn-2")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    showStep(currentStep - 1);
    showCircle(currentCircle - 1);
});
(_e = document.getElementById("prev-btn-3")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    showStep(currentStep - 1);
    showCircle(currentCircle - 1);
});
(_f = document.getElementById("prev-btn-4")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
    showStep(currentStep - 1);
    showCircle(currentCircle - 1);
});
// Submit button logic
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (validatePersonalInfo() && validateContactInfo() && validateEducation()) {
        // usersData.push({ ...formData }); // Add the current user's data to the array
        // saveDataToLocalStorage(); // Save the updated array to localStorage
        alert("User data submitted successfully!");
        // Reset the form for the next user
        formData = {
            personalInfo: { firstName: "", lastName: "", email: "" },
            contactInfo: { phoneNumber: "", address: "", postalCode: "" },
            education: { institute: "", educationLevel: "", grades: "" },
        };
        populateFields(); // Clear the form fields
        showStep(1); // Reset to the first step
    }
});
// Add new education entry dynamically
(_g = document.getElementById("add-education-btn")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
    const container = document.getElementById("education-container");
    // Clone the first education entry
    const newEntry = container.firstElementChild.cloneNode(true);
    // Clear the input fields in the cloned entry
    newEntry.querySelectorAll("input").forEach((input) => (input.value = ""));
    newEntry.querySelector("select").value = "elementary"; // Reset select to default value
    // Append the new entry to the container
    container.appendChild(newEntry);
});
// Populate fields on page load
populateFields();
showStep(currentStep); // Show the initial step
showCircle(currentCircle);
