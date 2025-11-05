import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import DoctorDetail from "./pages/DoctorDetail";
import Contact from "./pages/Contact";
import App1 from "./admin/App1"; // Admin/Doctor App
import Login from "./pages/Login";
import ScrollToTop from "./components/ScorllToTop";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";

const App = () => {
  const location = useLocation();

  // Hide Nav/Footer on these pages
  const hideNavFooter = ["/login", "/admin"];
  const shouldHide = hideNavFooter.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHide && <NavBar />}
      <ScrollToTop />

      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality/:id" element={<DoctorDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />

          {/* Admin / Doctor Routes */}
          <Route path="/admin/*" element={<App1 />} />
        </Routes>
      </div>

      {!shouldHide && <Footer />}
    </div>
  );
};

export default App;
