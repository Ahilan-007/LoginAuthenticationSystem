# Login Authentication System

## Project Overview
The IBM FE Login Authentication System is a web-based application that provides a secure user authentication mechanism. The system allows users to **register**, **login**, **access a protected dashboard**, and **reset their passwords**. It is built using **AngularJS** for the frontend and **Node.js + Express + MongoDB** for the backend, providing a full-stack solution with JWT-based authentication.

---

## Features

- **User Registration:** Users can create an account with email, password, and name.
- **Secure Login:** JWT-based authentication to secure user sessions.
- **Dashboard Access:** Protected route accessible only after successful login.
- **Forgot Password:** Mock password reset functionality for user convenience.
- **Responsive UI:** Clean and modern design compatible with mobile and desktop.
- **Cross-Origin Support:** Configured CORS to allow both local and deployed frontend access.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | AngularJS, HTML, CSS, JavaScript |
| Backend  | Node.js, Express.js |
| Database | MongoDB (Atlas) |
| Authentication | JSON Web Tokens (JWT) |
| Hosting | Render (Backend), Netlify (Frontend) |

---

## Installation & Setup Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/LoginAuthenticationSystem.git
   cd LoginAuthenticationSystem/backend

_____


Install dependencies:

bash
Copy code
npm install
Create a .env file in the backend folder with the following:

env
Copy code
PORT=5000
JWT_SECRET=your_jwt_secret
DB_USER=your_db_user
DB_PASS=your_db_password
DB_CLUSTER=your_cluster_name
DB_NAME=loginDB
Start the server:

bash
Copy code
node server.js
The backend will run at http://localhost:5000.

Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd ../frontend
Open index.html in a browser, or deploy using Netlify:

Publish Directory: / (root of the frontend folder)

Function Directory: leave empty

Ensure the API_URL in index.html points to your backend:

javascript
Copy code
const API_URL = "https://your-backend.onrender.com";
Usage
Register a New User: Navigate to the Register page and create an account.

Login: Enter email and password to access the protected dashboard.

Dashboard: View user-specific details and confirmation of successful login.

Forgot Password: Click the link on the login page to simulate password reset.

Demo Walkthrough
1. Initial Login Page:
Displays the entry interface for users. No input is required initially.

2. Register a New User:
Users can create an account. After successful registration, they are redirected to login.

3. Login:
Enter registered credentials. JWT token is generated and stored in the browser for session management.

4. Dashboard:
Protected route that displays a personalized welcome message and user details.

5. Forgot Password:
Mock feature to demonstrate password reset workflow.

Challenges & Solutions
Challenge	Solution
CORS issues when frontend and backend are on different domains	Configured CORS in backend to allow both local and deployed frontend URLs
JWT token handling in AngularJS	Stored tokens in localStorage and attached them to headers for protected routes
Deployment synchronization	Deployed backend on Render and frontend on Netlify with consistent API URLs

Repository & Deployed Links
GitHub Repository: https://github.com/Ahilan-007/LoginAuthenticationSystem

Deployed Frontend: https://loginauthenticationsystem.netlify.app

Deployed Backend: https://loginauthenticationsystem.onrender.com

Conclusion
This project demonstrates a full-stack login authentication system with modern web technologies, secure session management using JWT, and deployment on cloud platforms. It can be used as a foundation for larger projects requiring user authentication and protected routes.

