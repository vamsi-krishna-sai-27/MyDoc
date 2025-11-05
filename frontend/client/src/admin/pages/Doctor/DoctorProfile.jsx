import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Update profile API
  const updateProfile = async () => {
    if (!profileData) return toast.error("Profile data not loaded");
    if (!dToken) return toast.error("Not authorized");

    try {
      setLoading(true);

      const updateData = {
        address: profileData.address,
        fees: Number(profileData.fees),
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        { headers: { dtoken: dToken } } // ✅ Corrected header key
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch profile on mount / token change
  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading profile data...
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 m-5">
        {/* ------- Profile Image ------- */}
        <div>
          <img
            className="bg-sky-400/80 w-full sm:max-w-64 rounded-lg"
            src={profileData?.image || "/placeholder-doctor.png"}
            alt="Doctor"
          />
        </div>

        {/* ------- Profile Details ------- */}
        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          {/* ------- Doctor Info ------- */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {profileData?.name || "Doctor Name"}
          </p>

          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {profileData?.degree || "MBBS"} -{" "}
              {profileData?.speciality || "Speciality"}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {profileData?.experience || "Experience"}
            </button>
          </div>

          {/* ------- About Doctor ------- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
              About:
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {profileData?.about || "No about info provided."}
            </p>
          </div>

          {/* ------- Fees ------- */}
          <p className="text-gray-600 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-800">
              {currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={profileData?.fees || ""}
                  className="border rounded px-2 py-0.5 ml-1"
                />
              ) : (
                profileData?.fees
              )}
            </span>
          </p>

          {/* ------- Address ------- */}
          <div className="flex gap-2 py-2">
            <p>Address:</p>
            <p className="text-sm">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData?.address?.line1 || ""}
                    className="border rounded px-2 py-0.5 mb-1 block"
                    placeholder="Address line 1"
                  />
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData?.address?.line2 || ""}
                    className="border rounded px-2 py-0.5 block"
                    placeholder="Address line 2"
                  />
                </>
              ) : (
                <>
                  {profileData?.address?.line1} <br />
                  {profileData?.address?.line2}
                </>
              )}
            </p>
          </div>

          {/* ------- Availability ------- */}
          <div className="flex gap-1 pt-2">
            <input
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              checked={profileData?.available || false}
              type="checkbox"
              id="available"
            />
            <label htmlFor="available">Available</label>
          </div>

          {/* ------- Buttons ------- */}
          {isEdit ? (
            <button
              onClick={updateProfile}
              disabled={loading}
              className="px-4 py-1 border border-sky-400 text-sm rounded-full mt-5 hover:bg-sky-400 hover:text-white transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-sky-400 text-sm rounded-full mt-5 hover:bg-sky-400 hover:text-white transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
