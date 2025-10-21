import Doctor from "../models/Doctor.js";

export const addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create({ ...req.body, userId: req.user._id });
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const { specialization } = req.query;
    const filter = specialization ? { specialization } : {};
    const doctors = await Doctor.find(filter).populate("userId", "name email");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
