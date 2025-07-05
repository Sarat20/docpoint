import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/mongodb.js";


const app=express();
const port =process.env.PORT || 6000;
connectDB();
// connectCloudinary();

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.status(200).send('Hello World')
})

app.listen(port,()=>{
    console.log(`listening on localhost:${port}`)
});