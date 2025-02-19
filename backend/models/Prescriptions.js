import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Appointment',
        required: true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },
    medications:[
        {
            name:{type:String,required:true},
            dosage:{type:String,required:true},
            duration:{type:String,required:true},
        }
    ],
    notes:{type:String},
},{timestamps:true});

const Prescription =mongoose.model('Prescription',prescriptionSchema);;
export default Prescription;