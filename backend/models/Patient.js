import mongoose from "mongoose";
import bcrypt from 'bcrypt'

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");


const patientSchema = new mongoose.Schema({
    firstName:{type:String, required: true},
    lastName:{type:String},
    phoneNumber : {type:String, required: true, unique : true},
    email: {type : String, required : true},
    bloodGroup  :{ 
        type: String, 
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], 
        required: true 
      }, // Required dropdown values

    gender : { type: String, enum: ["Male", "Female"], required: true }, // Radio button values
    dateOfBirth : {type:Date, required: true},
    age : {type: Number, required: true},
    username : {type:String, required:true, unique:true},
    password : {type:String, required:true},
    address : {type: String, required:true},

});

// Pre-save middleware for password hashing
patientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip if password is unchanged
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt); // Hash password
      next();
      
    } catch (error) {
      next(error);
    }
  });

const Patient =  mongoose.model('Patient',patientSchema);
export default Patient;
