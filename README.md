# Contact Manager Application

The Contact Manager Application is designed to help you manage your contacts efficiently. With features like adding, modifying, and deleting contacts, this application offers a smooth experience for organizing your personal or professional network.

## Online Demo
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
- Modern interface with Tailwind CSS styling
- User authentication (login/registration)
- Add new contacts with details like name, email, phone, and photo
- Edit existing contacts to update their information
- Delete contacts with a confirmation window to prevent accidental deletions
- View contact details with a user-friendly interface
- Pagination for better navigation through contacts

## Screenshots

### Authentication
| Login | Register |
|-----------|-------------|
| ![Login Screen](/public/screenshoots/login.png) | ![Registration Screen](/public/screenshoots/register.png) |

### Contact Management
| All Contacts | Create Contact |
|-------------------|------------------|
| ![All Contacts](/public/screenshoots/all_contacts.png) | ![Create Contact](/public/screenshoots/create_contact.png) |

| Contact Details | Edit Contact |
|--------------------|---------------------|
| ![Contact Details](/public/screenshoots/contact_details.png) | ![Edit Contact](/public/screenshoots/edit_contact.png) |

| Delete Contact | Pagination |
|----------------------|------------|
| ![Delete Contact](/public/screenshoots/delete_contact.png) | ![Pagination](/public/screenshoots/pagination.png) |

### Contact Search
| Search with No Results |
|--------------------------|
| ![Search with No Results](/public/screenshoots/not_contact_searched_found.png) |

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

### Tailwind CSS Configuration
The application uses Tailwind CSS for styling with a custom configuration:

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
To install and run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/pinsdev24/contact-manager.git
   ```
   or just unzip the project folder.

2. Navigate to the project directory:
   ```bash
   cd contact-manager (github) or contact-manager-app (unzipped file)
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   ng serve
   ```

5. Open your browser and go to `http://localhost:4200/` to view the application.

## Usage
- Sign up or log in with existing credentials
- Navigate to the Contacts page to see all your contacts
- Use the search feature to find specific contacts
- Click on a contact to view their detailed information
- Use the Edit button to update contact details
- Click the Delete button to remove a contact, with a confirmation prompt