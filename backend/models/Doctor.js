import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name:{
        type:String,
        required:true
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    qualification: {
      type: String,
    },
    experience: {
      type: Number,
      default: 0,
    },
    clinicAddress: {
      type: String,
      required: true,
    },
    availableSlots: [
      {
        date: String, // e.g., "2025-10-21"
        time: [String], // e.g., ["10:00 AM", "11:30 AM"]
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
