import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../api/config";
import Header from "../components/Navbar/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Profile/Sidebar";

export default function ViewAds() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  // Fetching advertisements when component mounts
  useEffect(() => {
    const fetchAdvertisements = async () => {
      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get("/advertisements", {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY, // Replace with actual API key
            Authorization: `Bearer ${token}`,
          },
        });

        setListings(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch advertisements.");
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, [token, navigate]);

  // Deleting advertisement
  const deleteAdvertisement = async (id) => {
    try {
      await axios.delete(`/advertisements/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== id)
      );
      alert("Advertisement deleted successfully");
    } catch (err) {
      alert("Failed to delete advertisement.");
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
            <a href="/Myaccount" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <span className="text-gray-400">/</span>
            <a
              href="/advertisements"
              className="text-gray-600 hover:text-gray-900"
            >
              Advertisements
            </a>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="space-y-8">
              <div className="container mx-auto p-4">
                <div className="flex gap-6">
                  {/* Main Content */}
                  <div className="flex-1 space-y-4">
                    {listings.map((listing) => (
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
