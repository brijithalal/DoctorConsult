import mongoose from 'mongoose';

const specializationSchema = new mongoose.Schema({
    specializationName: { type: String, required: true }, // Example: "Cardiologist"
});

const Specialization = mongoose.model('Specialization', specializationSchema);
export default Specialization;
