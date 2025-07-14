import express from "express";
import {
  registerDoctor,
  loginDoctor,
  doctorList,
  appointmentsDoctor,
  changeAvailability,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.post('/register', registerDoctor); 
doctorRouter.post('/login', loginDoctor);       
doctorRouter.get('/list', doctorList);        
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor); 
doctorRouter.post('/change-availability', authDoctor, changeAvailability); 

export default doctorRouter;
