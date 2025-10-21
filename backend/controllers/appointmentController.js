import Appointment from "../models/Appointment.js";

// Create new appointment
export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const appointment = await Appointment.create({
      doctorId,
      patientId: req.user._id,
      date,
      time,
      reason,
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all appointments (admin/patient/doctor)
export const getAppointments = async (req, res) => {
  try {
    const query = {};
    if (req.user.role === "patient") query.patientId = req.user._id;
    if (req.user.role === "doctor") query.doctorId = req.user._id;

    const appointments = await Appointment.find(query)
      .populate("doctorId", "specialization")
      .populate("patientId", "name email");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update appointment status
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
