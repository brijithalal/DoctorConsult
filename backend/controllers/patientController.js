import Patient from "../models/Patient.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET ;
const  TOTAL_EXPIRY =  process.env.TOTAL_EXPIRY || '1d';

export const registerPatient = async (req,res)=>{
    try{
        const{firstName,lastName,email,gender, phoneNumber, dateOfBirth,bloodGroup, age,username, password, address} = req.body;
         
        const normalizedEmail = email.toLowerCase();

        const existingEmail = await Patient.findOne({email:normalizedEmail})
        if(existingEmail){
            return res.status(400).json({message:"Email already exists"});
        }

        const existingUsername = await Patient.findOne({username})

        if(existingUsername){
            return res.status(400).json({message:"Username already exists"});
        }
        //check if email or username already exists
        const existingPatient = await Patient.findOne({$or : [{email},{username}]})
        if(existingPatient){
            return res.status(400).json({message: "Email or username already exists"});
        }

        // const hashedPassword = await bcrypt.hash(password,10);

        const newPatient =  new Patient({
            firstName,
            lastName,
            email: normalizedEmail,
            phoneNumber,
            email,
            gender,
            dateOfBirth,
            bloodGroup,
            age,
            username,
            password,
            address
        });

        // const token = jwt.sign({id: newPatient._id},'JWT_SECRET',{expiresIn: TOTAL_EXPIRY});

        await newPatient.save();

        res.status(201).json({message:"Patient registered successfully", 
           
        });
    }
    catch(error){
        res.status(500).json({message:"Error registering patient", error});
    }
};




export const loginPatient = async (req,res)=>{
    try {
        const {username,password} = req.body

        if(!username || !password) {
            return res.status(400).json ({message:"Please provide the username and password"})
        }

        const patient = await Patient.findOne({username})

        if(!patient){
            return res.status(404).json({message:"Invalid username and password"})
        }
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid){
            return res.status(404).json({message:"Invalid username and password"});   
        }
        
        const token = jwt.sign({ id: patient._id}, JWT_SECRET_KEY, {expiresIn: TOTAL_EXPIRY})
        res.status(200).json({message:"Login Successfull", 
            token: token
        });
    }
    catch(error){
        res.status(500).json({message:"Error Logging in", 
            error:error.message
        });
    }
}