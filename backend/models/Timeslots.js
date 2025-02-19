import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema(
    {
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
        date: { type: Date, required: true }, 
        startTime: { type: String, required: true }, 
        endTime: { type: String, required: true }, 
        isAvailable: { type: Boolean, default: true }, 
    },
    { timestamps: true }
);

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);
export default TimeSlot;
