# Contact Manager App

Contact Manager App is a powerful tool designed to help you manage your contacts efficiently. With features like adding, editing, and deleting contacts, this app provides a seamless experience for organizing your personal or professional network.

## Live Demo
The application is deployed and available at [https://contact-manager-lemon.vercel.app/](https://contact-manager-lemon.vercel.app/)

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [UI Guidelines](#ui-guidelines)
- [Installation](#installation)
- [Usage](#usage)
- [Known Issues](#known-issues)

## Features
- Modern UI with Tailwind CSS styling
- User authentication (login/register)
- Add new contacts with details like name, email, phone, and photo
- Edit existing contacts to update their information
- Delete contacts with a confirmation modal to prevent accidental deletions
- View contact details with a user-friendly interface
- Pagination for better navigation through contacts

## Screenshots

### Authentication
| Login | Registration |
|-------|-------------|
| ![Login Screen](/public/screenshoots/login.png) | ![Registration Screen](/public/screenshoots/register.png) |

### Contacts Management
| All Contacts | Create Contact |
|--------------|----------------|
| ![All Contacts](/public/screenshoots/all_contacts.png) | ![Create Contact](/public/screenshoots/create_contact.png) |

| Contact Details | Edit Contact |
|-----------------|--------------|
| ![Contact Details](/public/screenshoots/contact_details.png) | ![Edit Contact](/public/screenshoots/edit_contact.png) |

| Delete Contact | Pagination |
|----------------|------------|
| ![Delete Contact](/public/screenshoots/delete_contact.png) | ![Pagination](/public/screenshoots/pagination.png) |

## Project Structure
```
src/
├── app/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   ├── contacts/
│   │   ├── components/
│   │   ├── models/
│   │   └── services/
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── styles.css
└── main.ts
```

## UI Guidelines
The application uses a consistent design language with:
- Custom color palette (primary: #6c63ff, secondary: #ff6584)
- Custom border radius (20px)
- Custom shadow effects
- Responsive design for mobile and desktop views

### Tailwind CSS Setup
The application uses Tailwind CSS for styling with custom configuration:

1. Configuration file (`tailwind.config.js`):
```js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f7fa',
        primary: '#6c63ff',
        secondary: '#ff6584',
        text: '#333',
      },
      borderRadius: {
        custom: '20px',
      },
      boxShadow: {
        custom: '0 4px 12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
```

2. Global styles (`styles.css`):
```css
@import 'tailwindcss';
@config "../tailwind.config.js";
```

## Installation
To install and run the app locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/pinsdev24/contact-manager.git
   ```

2. Navigate to the project directory:
   ```bash
   cd contact-manager
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   ng serve
   ```

5. Open your browser and go to `http://localhost:4200/` to view the app.

## Usage
- Register a new account or login with existing credentials
- Navigate to the Contacts page to view all contacts
- Use the search functionality to find specific contacts
- Click on a contact to view detailed information
- Use the Edit button to modify contact details
- Click the Delete button to remove a contact, with a confirmation prompt

## Known Issues
- **API Limitations**: The current API implementation has some issues:
  - Pagination functionality is not working as expected event by having more than 10 contacts I have created.
  - Search functionality has limitations and may not return accurate results
  - The overall swagger api is not well documented

### API Issues Screenshots
| API Issue 1 | API Issue 2 |
|-------------|-------------|
| ![API Issue 1](/public/screenshoots/api_issue1.png) | ![API Issue 2](/public/screenshoots/api_issue2.png) |