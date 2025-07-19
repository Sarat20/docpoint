
# 🩺 DocPoint

A full-stack doctor appointment booking platform that allows users to browse doctors by specialization, book appointments with time slots, and enables doctors to manage availability and view earnings in real-time.

## 🌐 Live Demo

🔗 [Visit DocPoint on Render](https://docpoint.onrender.com/)

## 🧰 Tech Stack

**Frontend:** React, Tailwind CSS, Axios, React Toastify, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer  
**Authentication:** JWT (JSON Web Tokens)  
**Deployment:** Render

## 🔑 Features

### 👨‍⚕️ Doctor Features
- Doctor Registration/Login with image upload
- View and update profile
- Manage availability slots
- View assigned appointments
- Cancel patient appointments
- Track real-time earnings

### 👤 User Features
- User Registration/Login
- Update profile with profile picture
- Browse doctors by specialization
- Book appointments with slot selection
- Cancel appointments

## 🧭 API Endpoints

### 🔐 Auth & Profile

#### User
- `POST /api/user/register` – Register new user
- `POST /api/user/login` – Login user
- `GET /api/user/get-profile` – Get user profile (auth required)
- `POST /api/user/update-profile` – Update profile (auth + file upload)

#### Doctor
- `POST /api/doctor/register` – Register new doctor (with image)
- `POST /api/doctor/login` – Doctor login
- `GET /api/doctor/get-profile` – Get doctor profile (auth required)
- `POST /api/doctor/update-profile` – Update profile (auth required)
- `GET /api/doctor/list` – Get list of doctors
- `GET /api/doctor/appointments` – Doctor appointments (auth required)
- `POST /api/doctor/change-availability` – Change availability (auth required)
- `GET /api/doctor/:id` – Get doctor by ID
- `DELETE /api/doctor/cancel/:id` – Doctor cancels appointment (auth required)

#### Appointment
- `POST /api/appointment/create` – Create new appointment (auth required)
- `GET /api/appointment/user` – Get user appointments (auth required)
- `GET /api/appointment/doctor` – Get doctor appointments (auth required)
- `PUT /api/appointment/cancel/:appointmentId` – Cancel appointment (user auth)
- `GET /api/appointment/earnings` – Get doctor earnings (auth required)



