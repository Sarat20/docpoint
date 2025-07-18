import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";

const app=express();
const port =process.env.PORT || 2000;
connectDB();
connectCloudinary();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://docpoint.onrender.com'],
  credentials: true,
}));

app.use('/api/user',userRouter)
app.use('/api/doctor',doctorRouter)
app.use("/api/appointment", appointmentRouter);

app.get('/',(req,res)=>{
    res.status(200).send('Hello World')
})

app.listen(port,()=>{
    console.log(`listening on localhost:${port}`)
});
