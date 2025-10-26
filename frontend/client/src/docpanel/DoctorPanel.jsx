import React, { useState } from "react";
import { assetss } from "../assets/assets/assets_admin/assets";
import { assets } from "../assets/assets/assets_frontend/assets";

const DoctorPanel = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isEditing, setIsEditing] = useState(false);

  const doctorInfo = {
    name: "Dr. Richard James",
    image: assetss.doc1,
    speciality: "General Physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis is committed to delivering comprehensive medical care, emphasizing preventive health, early diagnosis, and personalized treatment strategies.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  };

  const menuItems = [
    { icon: assetss.home_icon, label: "Dashboard" },
    { icon: assetss.appointment_icon, label: "Appointments" },
    { icon: assetss.people_icon, label: "Profile" },
  ];

  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: assetss.earning_icon,
                title: "Earnings",
                value: "₹42,000",
                color: "text-sky-500",
              },
              {
                icon: assetss.appointments_icon,
                title: "Appointments",
                value: "28",
                color: "text-green-500",
              },
              {
                icon: assetss.patients_icon,
                title: "Patients",
                value: "17",
                color: "text-purple-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <img src={item.icon} alt={item.title} className="w-14 h-14" />
                <div>
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        );

      case "Appointments":
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Appointments
            </h2>
            <p className="text-gray-600">
              You have <span className="font-semibold text-sky-500">3</span>{" "}
              upcoming appointments today.
            </p>
          </div>
        );

      case "Profile":
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg text-sm transition-all duration-300"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {!isEditing ? (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={doctorInfo.image}
                    alt={doctorInfo.name}
                    className="w-20 h-20 rounded-full border-4 border-sky-100 shadow-md"
                  />
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      {doctorInfo.name}
                    </p>
                    <p className="text-gray-500">{doctorInfo.speciality}</p>
                  </div>
                </div>

                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Degree:</strong> {doctorInfo.degree}
                  </p>
                  <p>
                    <strong>Experience:</strong> {doctorInfo.experience}
                  </p>
                  <p>
                    <strong>Consultation Fee:</strong> ₹{doctorInfo.fees}
                  </p>
                  <p>
                    <strong>Address:</strong> {doctorInfo.address.line1},{" "}
                    {doctorInfo.address.line2}
                  </p>
                </div>

                <p className="text-gray-700 mt-4 leading-relaxed border-t pt-4">
                  {doctorInfo.about}
                </p>
              </div>
            ) : (
              <form className="space-y-4">
                <input
                  type="text"
                  defaultValue={doctorInfo.name}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-300 outline-none"
                />
                <input
                  type="text"
                  defaultValue={doctorInfo.speciality}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-300 outline-none"
                />
                <input
                  type="text"
                  defaultValue={doctorInfo.degree}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-300 outline-none"
                />
                <input
                  type="text"
                  defaultValue={doctorInfo.experience}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-300 outline-none"
                />
                <textarea
                  defaultValue={doctorInfo.about}
                  className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-sky-300 outline-none"
                ></textarea>
                <input
                  type="text"
                  defaultValue={`${doctorInfo.address.line1}, ${doctorInfo.address.line2}`}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-300 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Save
                </button>
              </form>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl px-5 py-8 flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-sky-600 mb-4">Doctor Panel</h1>
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeItem === item.label
                ? "bg-sky-500 text-white"
                : "hover:bg-sky-100 text-gray-700"
            }`}
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`w-5 h-5 ${
                activeItem === item.label ? "filter brightness-0 invert" : ""
              }`}
            />
            <p className="font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{activeItem}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default DoctorPanel;
