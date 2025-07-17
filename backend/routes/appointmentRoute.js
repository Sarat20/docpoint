import express from "express";
import {
  createAppointment,
  getUserAppointments,
  getDoctorAppointments,
  cancelAppointment
} from "../controllers/appointmentController.js";

import authDoctor from "../middleware/authDoctor.js";
import authUser from "../middleware/authUser.js";
const appointmentRouter = express.Router();

appointmentRouter.post("/create", authUser, createAppointment);
appointmentRouter.get("/user", authUser, getUserAppointments);
appointmentRouter.get("/doctor", authDoctor, getDoctorAppointments);
appointmentRouter.put("/cancel/:appointmentId", authUser,cancelAppointment);

export default appointmentRouter;
