import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  // ✅ Format date and time
  const formatFullDate = (timestamp) => {
    if (!timestamp) return "Date unavailable";
    const dateObj = new Date(Number(timestamp));
    return dateObj.toLocaleString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ✅ Fetch all appointments
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(
          data.appointments.map((item) => ({
            id: item._id,
            userId: item.userId,
            docId: item.docId,
            slotDate: item.slotDate,
            slotTime: item.slotTime,
            userData: item.userData,
            docData: item.docData,
            amount: item.amount,
            date: item.date,
            cancelled: item.cancelled,
            payment: item.payment,
            isCompleted: item.isCompleted,
          }))
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load appointments");
    }
  };

  // ✅ Cancel appointment
  const handleCancel = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Appointment Cancelled Successfully");
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel appointment");
    }
  };

  // ✅ Pay appointment
  const handlePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Payment Successful");
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  useEffect(() => {
    if (token) getAppointments();
  }, [token]);

  return (
    <div className="mx-8 sm:mx-20">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-200">
        My Appointments
      </p>

      <div>
        {appointments.length > 0 ? (
          appointments.map((item) => (
            <div
              key={item.id}
              className="grid sm:flex gap-6 py-4 border-b border-gray-200 items-center"
            >
              {/* Doctor Image */}
              <div>
                <img
                  className="w-32 h-32 object-cover bg-indigo-50 rounded"
                  src={item.docData?.image}
                  alt={item.docData?.name || "Doctor"}
                />
              </div>

              {/* Appointment Details */}
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData?.name || "Unknown Doctor"}
                </p>
                <p>{item.docData?.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData?.address?.line1}</p>
                <p className="text-xs">{item.docData?.address?.line2}</p>

                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  {formatFullDate(item.date)}
                </p>

                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Amount:
                  </span>{" "}
                  ₹{item.amount}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 justify-end">
                {/* Pay Button */}
                {!item.payment ? (
                  <button
                    onClick={() => handlePayment(item.id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-blue-400 hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                ) : (
                  <button className="text-sm text-green-600 border border-green-500 py-2 sm:min-w-48 cursor-default">
                    Paid
                  </button>
                )}

                {/* Cancel Button */}
                {!item.cancelled ? (
                  <button
                    onClick={() => handleCancel(item.id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-400 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                ) : (
                  <button className="text-sm text-red-600 border border-red-400 py-2 sm:min-w-48 cursor-default">
                    Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-5">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
