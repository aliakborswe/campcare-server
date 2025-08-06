# CampCare+ : Medical Camp Management System (MCMS) - Backend

## Overview

The backend of the Medical Camp Management System (MCMS) is built using Node.js, Express.js, MongoDB, and other modern web technologies to manage APIs, database interactions, and application logic. This system helps organizers and participants effectively coordinate and manage medical camps.

---

## Features

### Organizer-Specific Features

1. **Authentication & Authorization**
   - JWT-based authentication for secure access.
   - Organizer role-based authorization.
2. **Organizer Profile Management**
   - Update personal details such as name, image, and contact info.
3. **Add and Manage Camps**
   - Add camp details (name, date, time, fees, location, description, etc.).
   - Update or delete camp information.
   - View and manage registered participants.
4. **Manage Registered Camps**
   - Monitor participant data (name, payment status, confirmation status).
   - Cancel registrations if necessary.
   - Pagination and search implemented for ease of access.

### Participant-Specific Features

1. **Authentication & Authorization**
   - JWT-based secure login and registration.
   - Role-based access for participants.
2. **Participant Profile Management**
   - Update personal details such as name, image, and contact info.
3. **Camp Registration**
   - Join a camp and store details in the database.
   - Increment participant count upon successful registration.
4. **Payment History**
   - View all past transactions with camp details.
   - Status of payment (paid/unpaid) and organizer confirmation.
5. **Feedback & Ratings**
   - Provide feedback and rate camps post-payment confirmation.

### Shared Features

1. **Search and Filter**
   - Search camps based on keywords, healthcare professional name, and dates.
   - Sort camps by registration count, fees, or alphabetical order.
2. **Pagination**
   - Pagination added to all tables for efficient data handling.

---

## Technologies Used

### Core Technologies

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: Database to store camp, participant, and organizer data.

### Authentication and Security

- **JWT (JSON Web Tokens)**: Secure authentication for sensitive routes.
- **bcrypt.js**: Password hashing for user accounts.

### Middleware

- **Mongoose**: MongoDB object modeling for data validation and interactions.
- **Cors**: Cross-Origin Resource Sharing.
- **dotenv**: Manage environment variables securely.

---
