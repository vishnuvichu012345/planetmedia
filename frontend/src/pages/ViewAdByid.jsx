import { MapPin, Phone, Mail } from 'lucide-react';
import Header from "../components/Navbar/Header";
import Footer from "../components/Footer/Footer";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from '../api/config';
import { useNavigate, useParams } from 'react-router-dom';
import profile from '../images/profile.jpeg'

export default function ViewAdById() {
 const navigate = useNavigate();
 const { id } = useParams();

  const [adDetails, setAdDetails] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const token = localStorage.getItem("jwtToken");


  // Fetch advertisement details and user profile details
  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await axios.get(`/advertisements/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });
        setAdDetails(response.data);
      } catch (error) {
        console.error("Error fetching advertisement details:", error);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/profile", {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchAdDetails();
    fetchUserProfile();
  }, [id]);

  if (!adDetails || !userProfile) {
    return <div>Loading...</div>; // Show loading until data is fetched
  }
  if (!token) {
    // If no token, redirect to login
    navigate("/login");
    return;
}

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4 flex">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">{adDetails.title}</h1>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{userProfile.location}</span>
                <span className="mx-2">•</span>
                <span>Nov 01, 2023, 10:00am</span>
              </div>
            </div>
          </div>

          {/* Main Image and Thumbnails */}
          <div className="space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <img
                src={adDetails.image || "/placeholder.svg"}
                alt={adDetails.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Overview Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="prose max-w-none text-gray-500">
              <p>{adDetails.description}</p>
            </div>
          </div>
        </div>

        {/* Seller Info Card */}
        <div className="w-full max-w-sm p-4">
          {/* Profile Card Container */}
          <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
            {/* Price Section */}
            <div className="p-4 flex items-center justify-between bg-white">
              <div>
                <p className="text-sm text-gray-500">Price:</p>
                <p className="text-3xl font-bold text-pink-500">${adDetails.price}</p>
              </div>
              <button className="text-gray-600 hover:text-pink-500">
                <span className="sr-only">Options</span>
                ⋯
              </button>
            </div>

            {/* Profile Section */}
            <div className="px-4 pb-4 text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full border-2 border-white" />
                <img
                  src={profile}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 mb-1">
                Member since {userProfile.firstName} {userProfile.lastName}
              </p>
              <h2 className="text-xl font-semibold mb-4">{userProfile.firstName} {userProfile.lastName}</h2>

              {/* Contact Section */}
              <div className="space-y-2">
                <button
                  className="w-full py-2 px-4 text-left bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  onClick={() => setShowPhone(!showPhone)}
                >
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-pink-500" />
                    {showPhone ? userProfile.phone : "Click To Show Number"}
                  </div>
                </button>
                <button
                  className="w-full py-2 px-4 text-left bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  onClick={() => setShowEmail(!showEmail)}
                >
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-pink-500" />
                    {showEmail ? userProfile.email : "Click To Show Email"}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
