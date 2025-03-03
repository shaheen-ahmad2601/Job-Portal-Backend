# Job Portal Backend

## Overview

The Job Portal Backend is a REST API built with **Node.js** and **Express.js**, designed to facilitate job postings by employers and job applications by job seekers. This backend manages user authentication, job postings, job searching, and application tracking efficiently.

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

## Installation

### Prerequisites

Ensure the following are installed on your system:

- **Node.js**: Version 14.x or higher recommended.
- **MongoDB**: A local instance or a cloud service like MongoDB Atlas.

### Steps to Set Up

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/job-portal-backend.git
   cd job-portal-backend
