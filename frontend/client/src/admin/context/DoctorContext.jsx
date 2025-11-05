import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [dashLoading, setDashLoading] = useState(false);

  // 🔹 Log missing backend URL
  if (!backendUrl) {
    console.error("❌ Missing backend URL in environment variables");
  }

  // 🔹 Handle invalid or expired token
  const handleAuthError = (message) => {
    if (message?.toLowerCase().includes("token")) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("dToken");
      setDToken("");
    } else {
      toast.error(message);
    }
  };

  // 🔹 Automatically fetch data when token is available
  useEffect(() => {
    if (!dToken) return; // Skip if token not set
    getProfileData();
    getDashData();
    getAppointments();
  }, [dToken]);

  // 🔹 Fetch all appointments
  const getAppointments = async () => {
    if (!dToken) return;
    try {
      setAppointmentsLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { dtoken: dToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
        if (import.meta.env.DEV) console.log("Appointments:", data.appointments);
      } else {
        handleAuthError(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load appointments");
    } finally {
      setAppointmentsLoading(false);
    }
  };

  // 🔹 Complete appointment
  const completeAppointment = async (appointmentId) => {
    if (!dToken) return;
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        handleAuthError(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete appointment");
    }
  };

  // 🔹 Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    if (!dToken) return;
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        handleAuthError(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel appointment");
    }
  };

  // 🔹 Dashboard summary
  const getDashData = async () => {
    if (!dToken) return;
    try {
      setDashLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { dtoken: dToken },
      });

      if (data.success) {
        setDashData(data.dashData);
        if (import.meta.env.DEV) console.log("Dashboard:", data.dashData);
      } else {
        handleAuthError(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    } finally {
      setDashLoading(false);
    }
  };

  // 🔹 Profile data
  const getProfileData = async () => {
    if (!dToken) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { dtoken: dToken },
      });

      if (data.success) {
        setProfileData(data.profileData);
        if (import.meta.env.DEV) console.log("Doctor Profile:", data.profileData);
      } else {
        handleAuthError(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Export all state and functions (memoized to prevent re-renders)
  const value = useMemo(
    () => ({
      dToken,
      setDToken,
      backendUrl,
      appointments,
      setAppointments,
      getAppointments,
      completeAppointment,
      cancelAppointment,
      dashData,
      setDashData,
      getDashData,
      profileData,
      setProfileData,
      getProfileData,
      loading,
      appointmentsLoading,
      dashLoading,
    }),
    [
      dToken,
      appointments,
      dashData,
      profileData,
      loading,
      appointmentsLoading,
      dashLoading,
    ]
  );

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
