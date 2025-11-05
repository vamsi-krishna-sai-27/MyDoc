import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  payAppointment, // ✅ Added payment controller
} from "../controllers/userController.js";

import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

// ✅ Authentication Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// ✅ Profile Routes
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);

// ✅ Appointment Routes
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

// ✅ NEW: Payment Route
userRouter.post("/pay-appointment", authUser, payAppointment);

export default userRouter;
