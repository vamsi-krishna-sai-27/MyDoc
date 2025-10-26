import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ScrollToTop from './components/ScorllToTop';
import DocDash from './docpanel/DocDash';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';

const App = () => {
  const location = useLocation();

  // List of routes where you DON'T want NavBar/Footer
  const hideNavFooter = ["/admin", "/login","/doctorpanel","/adminpanel"];

  const shouldHide = hideNavFooter.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHide && <NavBar />}
      <ScrollToTop />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality/:id" element={<DoctorDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctorpanel" element={<DocDash/>}/>
          <Route path="/my-profile" element={<MyProfile/>}/>
          <Route path='/my-appointments' element={<MyAppointments/>}/>
        </Routes>
      </div>
      {!shouldHide && <Footer />}
    </div>
  );
};

export default App;
