var _a, _b;
const userModal = document.getElementById("userModal");
const closeModalBtn = document.querySelector(".close-btn");
const userTableBody = document.querySelector("#user-table tbody");
const updateForm = document.getElementById("update-form");
let usersData = JSON.parse(localStorage.getItem("usersData") || "[]");
let selectedUserIndex = null;
// Function to populate the table with user data
function populateUserTable() {
    userTableBody.innerHTML = usersData
        .map((user, index) => `
      <tr>
        <td>${user.personalInfo.firstName}</td>
        <td>${user.personalInfo.lastName}</td>
        <td>${user.personalInfo.email}</td>
        <td>
          <button class="view-btn" data-index="${index}">view</button>
        </td>
      </tr>`)
        .join("");
}
// Function to open the modal with user details
function openModal(index) {
    selectedUserIndex = index;
    const user = usersData[index];
    document.getElementById("update-first-name").value =
        user.personalInfo.firstName;
    document.getElementById("update-last-name").value =
        user.personalInfo.lastName;
    document.getElementById("update-email").value =
        user.personalInfo.email;
    document.getElementById("update-phone").value =
        user.contactInfo.phoneNumber;
    document.getElementById("update-address").value =
        user.contactInfo.address;
    document.getElementById("update-postal-code").value =
        user.contactInfo.postalCode;
    document.getElementById("update-institute").value =
        user.education.institute;
    document.getElementById("update-education").value =
        user.education.educationLevel;
    document.getElementById("update-grades").value =
        user.education.grades;
    userModal.style.display = "block"; // Open the modal
}
// Close the modal
closeModalBtn.addEventListener("click", () => {
    userModal.style.display = "none";
    selectedUserIndex = null;
});
// Close modal when clicking outside the content
window.addEventListener("click", (event) => {
    if (event.target === userModal) {
        userModal.style.display = "none";
        selectedUserIndex = null;
    }
});
// Save updates
(_a = document.getElementById("save-updates-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    if (selectedUserIndex !== null) {
        const user = usersData[selectedUserIndex];
        user.personalInfo.firstName = document.getElementById("update-first-name").value;
        user.personalInfo.lastName = document.getElementById("update-last-name").value;
        user.contactInfo.phoneNumber = document.getElementById("update-phone").value;
        localStorage.setItem("usersData", JSON.stringify(usersData));
        populateUserTable(); // Refresh the table
        userModal.style.display = "none"; // Close the modal
    }
});
// Delete user
(_b = document.getElementById("delete-user-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    if (selectedUserIndex !== null) {
        usersData.splice(selectedUserIndex, 1);
        localStorage.setItem("usersData", JSON.stringify(usersData));
        populateUserTable(); // Refresh the table
        userModal.style.display = "none"; // Close the modal
    }
});
// Handle click on view buttons
userTableBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("view-btn")) {
        const index = parseInt(target.dataset.index);
        openModal(index);
    }
});
// Populate the table on page load
populateUserTable();
