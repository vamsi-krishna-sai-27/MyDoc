import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProviderMain = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(null); // start with null
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // loading state

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

const loadUserProfileData = async () => {
  try {
    console.log("Loading profile data...");
    const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
      headers: { token },
    });
    console.log("Profile response:", data);
    if (data.success) {
      setUserData(data.user);
    } else {
      console.warn("Backend did not return success:", data);
      toast.error(data.message || "Failed to load profile");
    }
  } catch (error) {
    console.error("Profile fetch error:", error);
    toast.error(error.message);
  }
};


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    getDoctorsData();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    loading,
  };

  if (loading) return null; // or a loading spinner

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProviderMain;
