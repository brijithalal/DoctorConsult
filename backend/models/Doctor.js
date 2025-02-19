import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    phoneNo: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    profilePhoto: { type: String }, // URL of profile photo
    qualifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Qualification' }],
    specializations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Specialization' }], 
    availability: [
        {
            day: { type: String, required: true }, 
            startTime: { type: String, required: true }, 
            endTime: { type: String, required: true }, 
            date: { type: Date, required: true }
        },
    ],
    certificates: [
        {
            certificateName: { type: String, required: true }, // Name of the certificate
            issuedBy: { type: String }, // Organization that issued the certificate
            issueDate: { type: Date }, // Date of issuance
            expiryDate: { type: Date }, // Expiry date, if applicable
            documentUrl: { type: String, required: true }, // URL to the certificate document
        },
    ], 
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, 
}, { timestamps: true }
);


const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
