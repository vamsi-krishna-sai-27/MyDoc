import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doctors } from "../assets/assets/assets_frontend/assets";
import { assets } from "../assets/assets/assets_frontend/assets";

const DoctorDetail = () => {
  const { speciality, id } = useParams();
  const doctor = doctors.find((doc) => doc._id === id);

  // Appointment state
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState(false);

  if (!doctor) return <div className="text-center mt-20">Doctor not found</div>;

  const dates = [
    { day: "SAT", date: "25" },
    { day: "SUN", date: "26" },
    { day: "MON", date: "27" },
    { day: "TUE", date: "28" },
    { day: "WED", date: "29" },
    { day: "THU", date: "30" },
    { day: "FRI", date: "31" },
  ];

  const times = [
    "01:00 pm","01:30 pm","02:00 pm","02:30 pm","03:00 pm","03:30 pm",
    "04:00 pm","04:30 pm","05:00 pm","05:30 pm","06:00 pm","06:30 pm",
    "07:00 pm","07:30 pm","08:00 pm","08:30 pm"
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time slot!");
      return;
    }
    console.log({
      doctor: doctor.name,
      date: selectedDate,
      time: selectedTime,
      reason,
    });
    setSuccess(true);
    setReason("");
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Related doctors (same speciality, excluding current doctor)
  const relatedDoctors = doctors.filter(
    (d) => d.speciality === doctor.speciality && d._id !== doctor._id
  );

  return (
    <div className="flex flex-col items-center ">
      {/* Existing doctor info */}
      <div className="flex items-center justify-center gap-10 mt-10">
        <div>
          <img src={doctor.image} alt="" className="w-70 ml-25 bg-blue-500 rounded-2xl" />
        </div>
        <div className="border border-gray-400 px-7 py-8 w-200 h-70 rounded-2xl">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-medium">{doctor.name}</p>
            <img src={assets.verified_icon} alt="verified" className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-gray-500 mt-2">
            {doctor.degree} - {doctor.speciality}  
            <span className="border border-gray-300 px-1 text-black rounded-3xl text-xs"> {doctor.experience}</span>
          </p>
          <p className="mt-3 text-sm text-gray-500">
            <span className="font-bold ">Abouts</span> <br />{doctor.about}
          </p>
          <p className="mt-3 text-gray-800">
            Appointment fee: <span className="font-semibold text-black">${doctor.fees}</span>
          </p>
        </div>
      </div>

      {/* Appointment Booking System */}
      <div className="w-280 ml-20 bg-white border border-gray-200 rounded-2xl p-6 mt-10 ">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Book an Appointment</h3>

        {/* Dates */}
        <div className="flex gap-3 overflow-x-auto py-2 mb-4">
          {dates.map((d) => (
            <button
              key={d.date}
              onClick={() => setSelectedDate(d.date)}
              className={`min-w-[60px] text-center p-2 rounded-lg border transition-all duration-200 ${
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
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedTime === t
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white border-gray-300 hover:bg-sky-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Reason & Book Button */}
        <form onSubmit={handleBooking} className="space-y-4">
          <button
            type="submit"
            className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all duration-300"
          >
            Book an Appointment
          </button>
        </form>

        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
            Appointment booked successfully!
          </div>
        )}
      </div>

      {/* Related Doctors */}
      <p className="text-3xl mt-10 font-semibold">Related Doctors</p>
      <p className="text-sm mt-1">Simply browse through our extensive list of trusted doctors.</p>
        <div className="flex flex-wrap justify-center gap-10 pt-10 px-6">
          {relatedDoctors.length > 0 ? (
            relatedDoctors.map((item, index) => (
              <Link
                key={index}
                to={`/doctors/${item.speciality
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${item._id}`}
                className="relative border-gray-400 flex flex-col items-center bg-white p-5 w-64 rounded-2xl hover:-translate-y-2 transition-all duration-300 border"
              >
                {/* Badge */}
                {item.badge && (
                  <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
                    {item.badge}
                  </span>
                )}

                {/* Doctor Image */}
                <div className="w-full h-56 flex items-center justify-center bg-[#EAEFFF] rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Doctor Info */}
                <div className="text-center mt-4 space-y-1">
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.speciality}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500 text-lg mt-60 w-full">
              No doctors found in this category.
            </div>
          )}
        </div>
    </div>
  );
};

export default DoctorDetail;
