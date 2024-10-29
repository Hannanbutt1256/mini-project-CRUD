const userModal = document.getElementById("userModal") as HTMLElement;
const closeModalBtn = document.querySelector(".close-btn") as HTMLElement;
const userTableBody = document.querySelector(
  "#user-table tbody"
) as HTMLElement;
const updateForm = document.getElementById("update-form") as HTMLFormElement;

let usersData: any[] = JSON.parse(localStorage.getItem("usersData") || "[]");
let selectedUserIndex: number | null = null;

// Function to populate the table with user data
function populateUserTable() {
  userTableBody.innerHTML = usersData
    .map(
      (user, index) => `
      <tr>
        <td>${user.personalInfo.firstName}</td>
        <td>${user.personalInfo.lastName}</td>
        <td>${user.personalInfo.email}</td>
        <td>
          <button class="view-btn" data-index="${index}">view</button>
        </td>
      </tr>`
    )
    .join("");
}

// Function to open the modal with user details
function openModal(index: number) {
  selectedUserIndex = index;
  const user = usersData[index];

  (document.getElementById("update-first-name") as HTMLInputElement).value =
    user.personalInfo.firstName;
  (document.getElementById("update-last-name") as HTMLInputElement).value =
    user.personalInfo.lastName;
  (document.getElementById("update-email") as HTMLInputElement).value =
    user.personalInfo.email;
  (document.getElementById("update-phone") as HTMLInputElement).value =
    user.contactInfo.phoneNumber;
  (document.getElementById("update-address") as HTMLInputElement).value =
    user.contactInfo.address;
  (document.getElementById("update-postal-code") as HTMLInputElement).value =
    user.contactInfo.postalCode;
  (document.getElementById("update-institute") as HTMLInputElement).value =
    user.education.institute;
  (document.getElementById("update-education") as HTMLInputElement).value =
    user.education.educationLevel;
  (document.getElementById("update-grades") as HTMLInputElement).value =
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
document.getElementById("save-updates-btn")?.addEventListener("click", () => {
  if (selectedUserIndex !== null) {
    const user = usersData[selectedUserIndex];

    user.personalInfo.firstName = (
      document.getElementById("update-first-name") as HTMLInputElement
    ).value;
    user.personalInfo.lastName = (
      document.getElementById("update-last-name") as HTMLInputElement
    ).value;
    user.contactInfo.phoneNumber = (
      document.getElementById("update-phone") as HTMLInputElement
    ).value;

    localStorage.setItem("usersData", JSON.stringify(usersData));
    populateUserTable(); // Refresh the table
    userModal.style.display = "none"; // Close the modal
  }
});

// Delete user
document.getElementById("delete-user-btn")?.addEventListener("click", () => {
  if (selectedUserIndex !== null) {
    usersData.splice(selectedUserIndex, 1);
    localStorage.setItem("usersData", JSON.stringify(usersData));
    populateUserTable(); // Refresh the table
    userModal.style.display = "none"; // Close the modal
  }
});

// Handle click on view buttons
userTableBody.addEventListener("click", (event) => {
  const target = event.target as HTMLButtonElement;
  if (target.classList.contains("view-btn")) {
    const index = parseInt(target.dataset.index!);
    openModal(index);
  }
});

// Populate the table on page load
populateUserTable();
