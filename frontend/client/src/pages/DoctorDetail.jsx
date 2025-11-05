import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const DoctorDetail = () => {
  const { speciality, id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, currencySymbol, token } = useContext(AppContext);

  const [doctor, setDoctor] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState(false);

  // 🩺 Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
        if (data.success) {
          const selectedDoctor = data.doctors.find((doc) => doc._id === id);
          setDoctor(selectedDoctor);

          const related = data.doctors.filter(
            (d) => d.speciality === selectedDoctor?.speciality && d._id !== id
          );
          setRelatedDoctors(related);
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id, backendUrl]);

  // 🕒 Example available dates/times
  const dates = [
    { day: "SAT", date: "25" },
    { day: "SUN", date: "26" },
    { day: "MON", date: "27" },
    { day: "TUE", date: "28" },
    { day: "WED", date: "29" },
  ];

  const times = [
    "01:00 pm", "01:30 pm", "02:00 pm", "02:30 pm",
    "03:00 pm", "03:30 pm", "04:00 pm", "04:30 pm",
  ];

const handleBooking = async (e) => {
  e.preventDefault();

  if (!token) {
    alert("Please login to book an appointment!");
    navigate("/login");
    return;
  }

  if (!selectedDate || !selectedTime) {
    alert("Please select both date and time!");
    return;
  }

  try {
    const appointmentData = {
      docId: doctor._id,
      slotDate: selectedDate,
      slotTime: selectedTime,
    };

    const response = await axios.post(
      `${backendUrl}/api/user/book-appointment`,
      appointmentData,
      {
        headers: { token }, // ✅ fixed header key
      }
    );

    if (response.data.success) {
      setSuccess(true);
      setSelectedDate(null);
      setSelectedTime(null);
      setReason("");
    } else {
      alert(response.data.message || "Booking failed");
    }
  } catch (error) {
    console.error("Booking error:", error);
    alert("Something went wrong while booking.");
  }
};



  if (loading) return <div className="text-center mt-20">Loading doctor details...</div>;
  if (!doctor) return <div className="text-center mt-20">Doctor not found</div>;

  return (
    <div className="flex flex-col items-center">
      {/* 🧑‍⚕️ Doctor Info */}
      <div className="flex items-center justify-center gap-10 mt-10">
        <div>
          <img src={doctor.image} alt={doctor.name} className="w-70 ml-25 bg-blue-500 rounded-2xl" />
        </div>
        <div className="border border-gray-400 px-7 py-8 w-200 h-70 rounded-2xl">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-medium">{doctor.name}</p>
            <img src={assets.verified_icon} alt="verified" className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-gray-500 mt-2">
            {doctor.degree} - {doctor.speciality}
          </p>
          <p className="mt-3 text-gray-800">
            Experience : {doctor.experience}
          </p>
          <p className="mt-3 text-gray-800">
            {doctor.about}
          </p>
          <p className="mt-3 text-gray-800">
            Appointment Fee:{" "}
            <span className="font-semibold text-black">
              ₹{doctor.fees}
            </span>
          </p>
        </div>
      </div>

      {/* 📅 Booking Section */}
      <div className="w-280 ml-20 bg-white border border-gray-200 rounded-2xl p-6 mt-10">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Book an Appointment</h3>

        {/* Dates */}
        <div className="flex gap-3 overflow-x-auto py-2 mb-4">
          {dates.map((d) => (
            <button
              key={d.date}
              onClick={() => setSelectedDate(d.date)}
              className={`min-w-[60px] text-center p-2 rounded-lg border ${
                selectedDate === d.date
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white border-gray-300 hover:bg-sky-50"
              }`}
            >
              <p className="font-bold">{d.day}</p>
              <p>{d.date}</p>
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex flex-wrap gap-3 mb-4">
          {times.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`px-4 py-2 rounded-lg border ${
                selectedTime === t
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white border-gray-300 hover:bg-sky-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Booking Button */}
        <form onSubmit={handleBooking}>
          <button
            type="submit"
            className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
          >
            Book Appointment
          </button>
        </form>

        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
            Appointment booked successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetail;
