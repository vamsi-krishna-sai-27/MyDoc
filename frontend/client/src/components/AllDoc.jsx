import React, { useState } from "react";
import { doctors } from "../assets/assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const AllDoc = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const filteredDoctors =
    selectedCategory === "All"
      ? doctors
      : doctors.filter((doc) => doc.speciality === selectedCategory);

  return (
    <div className="mx-8 md:mx-20 my-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Find Your Specialist Doctor
      </h1>
      <p className="text-center text-gray-500 mt-2">
        Browse through the top-rated doctors by speciality.
      </p>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-sky-100 hover:text-sky-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
        <div className="flex flex-wrap justify-center gap-10 pt-10 px-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((item, index) => (
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

export default AllDoc;
