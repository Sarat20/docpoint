# 🩺 DocPoint — Doctor Appointment Booking Platform

**DocPoint** is a full-stack web application built to simplify doctor appointment scheduling.  
It enables **patients to browse doctors by specialization** and book appointments with chosen time slots.  
At the same time, **doctors have a separate dashboard** to manage their availability, track appointments, and monitor earnings in real-time.

It’s designed to provide a seamless and responsive experience for both mobile and desktop users.

---

## 🌐 Live Demo

🔗 [Visit DocPoint on Render](https://docpoint.onrender.com/)

---

## 🧰 Tech Stack

**Frontend:** React, Tailwind CSS, Axios, React Toastify, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer  
**Authentication:** JWT (JSON Web Tokens)  
**Deployment:** Render

---

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

---

## 📦 API Endpoints

### 👤 User Routes
| Method | Endpoint                   | Description                        |
|--------|----------------------------|------------------------------------|
| POST   | `/api/user/register`       | Register a new user                |
| POST   | `/api/user/login`          | Login as user                      |
| GET    | `/api/user/get-profile`    | Get user profile                   |
| POST   | `/api/user/update-profile` | Update profile (with image upload) |

### 👨‍⚕️ Doctor Routes
| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| POST   | `/api/doctor/register`            | Register a new doctor (image upload) |
| POST   | `/api/doctor/login`               | Login as doctor                      |
| GET    | `/api/doctor/get-profile`         | Get doctor profile                   |
| POST   | `/api/doctor/update-profile`      | Update doctor profile                |
| GET    | `/api/doctor/list`                | Get list of all doctors              |
| GET    | `/api/doctor/appointments`        | Get doctor appointments              |
| POST   | `/api/doctor/change-availability` | Change doctor availability           |
| GET    | `/api/doctor/:id`                 | Get doctor details by ID             |
| DELETE | `/api/doctor/cancel/:id`          | Cancel appointment by doctor         |

### 📅 Appointment Routes
| Method | Endpoint                                  | Description                    |
|--------|-------------------------------------------|--------------------------------|
| POST   | `/api/appointment/create`                 | Create new appointment         |
| GET    | `/api/appointment/user`                   | Get all appointments of user   |
| GET    | `/api/appointment/doctor`                 | Get all appointments of doctor |
| PUT    | `/api/appointment/cancel/:appointmentId`  | Cancel user appointment        |
| GET    | `/api/appointment/earnings`               | Get doctor earnings            |

---

## 📁 Project Structure

```bash
docpoint/
│
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── tailwind.config.js
│
├── server/                  # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── uploads/
│   ├── app.js
│   └── config/
│       └── db.js
│
├── .env
├── package.json
└── README.md
