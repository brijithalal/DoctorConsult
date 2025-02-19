import express from 'express' ;
import dotenv from "dotenv"; 

import patientRoutes from './routes/patientRoutes.js'

import { connectDB } from './config/db.js';

dotenv.config();

const app =express();
app.use(express.json()) //allow us to accept json data to body

// app.post("/specialization", async(req,rs)=>{
//     const specilization = req.body;
// })
app.use('',patientRoutes)


app.get("/", (req,res)=>{
    res.send("server is ready")
})
console.log(process.env.MONGO_CONNECTION_STRING);
app.listen(5000, ()=>{
    connectDB();
    console.log('server started at http://localhost:5000');
})

// IyY27n1EaHtGj2G5

// mongodb+srv://ajaysajiarjunan:<db_password>@cluster0.0wtsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0