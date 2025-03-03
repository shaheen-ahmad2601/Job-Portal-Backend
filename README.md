# Job Portal

## Overview

The Job Portal Backend is a RESTful API built with Node.js, Express.js, and MongoDB, enabling secure job postings, searches, and applications. It features data modeling with Mongoose, JWT authentication, role-based access control (RBAC), middleware validation, and logging for efficiency and security. Following REST principles, it ensures scalability with asynchronous operations and database indexing, making it a robust solution for job portals.

---

## Features

- **User Authentication**: Secure registration and login for employers and job seekers.
- **Job Posting**: Employers can create, update, and delete job listings.
- **Job Search**: Job seekers can search for jobs based on specific criteria.
- **Application Management**: Job seekers can apply for jobs, and employers can view and manage applications.
- **Role-Based Access Control**: Distinct access levels for employers and job seekers.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT Authentication**: Secure token-based login system.
- **Bcrypt.js**: Password hashing for enhanced security.
- **Dotenv**: Management of environment variables.

---

### Prerequisites

Ensure the following are installed on your system:

- **Node.js**: Version 14.x or higher recommended.
- **MongoDB**: A local instance or a cloud service like MongoDB Atlas.

### Steps to Set Up

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/job-portal-backend.git
   cd job-portal-backend
2. Install Dependencies
   - npm install or npm i
3. npm run start or npm start
