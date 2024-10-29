# Student Management System

## Overview

This application is built using HTML, CSS, JavaScript, and TypeScript. It provides a comprehensive platform for managing student information, featuring user authentication and a multi-step form for data entry.

## Features

- **Landing Page**: 
  - Provides two buttons for user login and registration.
  
- **User Registration**:
  - Users can register by providing a username, email, and password, which are securely stored in localStorage.
  
- **User Login**:
  - Users can log in using their email and password. Upon successful login, they are welcomed with their username.
  
- **Student Management**:
  - Users can add students through a multi-step form:
    - **Step 1**: Personal Information (First Name, Last Name, Email)
    - **Step 2**: Contact Details (Phone Number, Address, Postal Code)
    - **Step 3**: Education Details (Institute Name, Level of Education, Grades)
    - **Step 4**: Review Submission - Users can review their entries before submission.
  - After submission, users are redirected to Step 1 for adding additional students.

- **Fetch Student**:
  - Users can view a table of all registered students with basic personal information.
  - Clicking on a specific student displays their complete details, allowing users to update or delete the student's information.

## Technologies Used

- HTML
- CSS
- JavaScript
- TypeScript

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
2. **Open the application**:
   - Open `index.html` in your web browser to view the application.

## Usage

- Register a new user account using the registration form.
- Log in with your registered email and password.
- After logging in, you can add students or fetch the list of existing students.

### Adding Students

1. Click on the **Add Student** button.
2. Complete the multi-step form:
   - Enter personal info in Step 1.
   - Provide contact details in Step 2.
   - Fill in education details in Step 3.
   - Review your information in Step 4.
3. Click **Submit** to add the student to your list.

### Fetching Students

- Click on the **Fetch Student** button to view all registered students.
- Click on a specific student to see complete details and options to update or delete the student information.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.


## Acknowledgments

- Hannan Butt - Project Creator
