import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import Header from "../components/Navbar/Header";
import Footer from "../components/Footer/Footer";
import { API_KEY } from "../api/config";
import profile from '../images/profile.jpeg';
import Sidebar from "../components/Profile/Sidebar";

export default function Myaccount() {
  const [userProfile, setUserProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("/profile", {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });

        setUserProfile(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile. Please log in again.");
        localStorage.removeItem("jwtToken");
        navigate("/login");
      }
    };

    const fetchListings = async () => {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("/advertisements", {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });

        setListings(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching advertisements:", err);
        setError("Failed to fetch advertisements.");
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchListings();
  }, [navigate]);

  const deleteAdvertisement = async (id) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`/advertisements/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      setListings(listings.filter((listing) => listing.id !== id));
    } catch (err) {
      console.error("Error deleting advertisement:", err);
      setError("Failed to delete advertisement.");
    }
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
            <a href="/Myaccount" className="text-gray-600 hover:text-gray-900">My Account</a>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            {/* Sidebar */}
           
              <Sidebar />
          
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : userProfile ? (
              <div className="space-y-8">
                {/* Profile Header */}
                <div className="bg-gray-50 shadow-md rounded-lg p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={profile}
                        alt="Profile"
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h1 className="text-2xl font-semibold">{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
                        <p className="text-gray-500">Member since</p>
                        <p className="text-gray-600">2019</p>
                      </div>
                    </div>
                    <Link
                      to={{
                        pathname: "/ProfileUpdate",
                        state: { userProfile } // Passing the profile data to the ProfileUpdate page
                      }}
                    >
                      <button className="bg-transparent border border-gray-400 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                  <hr className="border-t border-gray-300 my-6" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{userProfile.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{userProfile.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{userProfile.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Listings */}
                <div className="space-y-4">
                  {loading ? (
                    <p>Loading listings...</p>
                  ) : listings.length === 0 ? (
                    <p>No listings available.</p>
                  ) : (
                    listings.map((listing) => (
                      <div
                        key={listing.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden"
                      >
                        <div className="flex gap-4 p-4">
                          <div className="flex-shrink-0">
                            <img
                              src={listing.image}
                              alt={listing.title}
                              className="w-[150px] h-[150px] object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  {listing.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {listing.description}
                                </p>
                                <p className="mt-2 text-lg font-semibold">
                                  ${listing.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Link
                                  to={`/ViewAdByid/${listing.id}`}
                                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                                >
                                  View
                                </Link>
                                <button className="px-4 py-2 bg-pink-600 hover:bg-pink-600 text-white rounded-lg">
                                  Edit Ad
                                </button>
                                <button
                                  onClick={() => deleteAdvertisement(listing.id)}
                                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            </div>
          </div>
        
      </main >

      {/* Footer */}
      < Footer />
    </div >
  );
}
