import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import compression from "compression";

import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";

const app = express();
const port = process.env.PORT || 2000;
connectDB();
connectCloudinary();
app.use(compression());
// Basic hardening
app.disable('x-powered-by');
app.use(express.json());
// Prefer explicit origin if provided via env; otherwise allow all for dev
const allowedOrigin = process.env.FRONTEND_URL || true;
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use('/api/user', userRouter);
app.use('/api/doctor', doctorRouter);
app.use("/api/appointment", appointmentRouter);

app.get('/', (req, res) => {
  res.status(200).send('Hello World')
});

app.listen(port, () => {
  console.log(`listening on localhost:${port}`)
});