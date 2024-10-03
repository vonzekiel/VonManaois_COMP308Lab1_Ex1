# Student/Course Management System (MERN Stack)

This project is a comprehensive student/course management system built using the MERN stack (MongoDB, Express, React, Node.js). The system allows students to interact with courses and admin users to manage student records. 

## Features
- **Express REST API**: 
  - CRUD functionalities for managing student and course information.
  
- **Student Model**:
  - `studentNumber`
  - `password`
  - `firstName`
  - `lastName`
  - `address`
  - `city`
  - `phoneNumber`
  - `email`
  - `program`
  - Two additional custom fields:
    - `favoriteTopic`
    - `strongestTechnicalSkill`

- **Course Model**:
  - `courseCode`
  - `courseName`
  - `section`
  - `semester`
  - `students` (References Student schema via MongoDB's `ref` feature)

- **Authentication & Authorization**:
  - JWT-based authentication
  - Secure HTTPOnly cookies

## Technologies Used
- **Backend**: Express, MongoDB, Mongoose
- **Frontend**: React (built with Vite), Tailwind CSS
- **Authentication**: JWT

## Setup Instructions

### Server
1. Navigate to the `server` directory.
2. Install dependencies:
   ```bash
   npm install
3. Run:
   ```bash
   npm run dev


Do the same for the client. 


Von Ezekiel Manaois
   
