import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Navbar/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Profile/Sidebar";
import { API_KEY } from "../api/config";

export default function ProfileUpdate() {
  const { state } = useLocation(); // Accessing the passed state (userProfile)
  console.log("state==",state)
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: state ? state.userProfile.firstName : "",
    lastName: state ? state.userProfile.lastName : "",
    email: state ? state.userProfile.email : "",
    username: state ? state.userProfile.username : "",
    photo: state ? state.userProfile.photo : "",
    location: state ? state.userProfile.location : "",
    contactNumber: state ? state.userProfile.contactNumber : "",
  });

  const token = localStorage.getItem("jwtToken");

  if (!token) {
    navigate("/login");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        "/profile",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          phone: formData.contactNumber,
          location: formData.location,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      resetForm();
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      photo: "",
      location: "",
      contactNumber: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-4 mb-8">
            <a href="/Myaccount" className="text-gray-600 hover:text-gray-900">Home</a>
            <span className="text-gray-400">/</span>
            <a href="/ProfileUpdate" className="text-gray-600 hover:text-gray-900">My Profile</a>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="space-y-8">
              {/* Profile Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name<span className="text-pink-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Type here"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Type here"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Type here"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium mb-1">
                      Contact Number
                    </label>
                    <input
                      id="contactNumber"
                      type="text"
                      placeholder="Type here"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-1">
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      placeholder="Type here"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-600 text-white px-4 py-2 rounded-lg"
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
