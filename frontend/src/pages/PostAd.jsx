import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Navbar/Header";
import Footer from "../components/Footer/Footer";
import { API_KEY } from "../api/config";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";

export default function PostAdvertisement() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
    });

    const [snackbar, setSnackbar] = useState({
        message: "",
        type: "", // 'success' or 'error'
        open: false,
    });

    const token = localStorage.getItem("jwtToken");

    if (!token) {
        // If no token, redirect to login
        navigate("/login");
        return;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage("");

        try {
            const response = await axios.post(
                "/advertisements",
                {
                    title: formData.title,
                    price: formData.price,
                    description: formData.description,
                    image: formData.image,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": API_KEY, // Replace with your actual API key
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Assuming response contains the created advertisement
            const newAdvertisement = response.data;
            console.log("Advertisement created:", newAdvertisement);
            setSuccessMessage("Advertisement posted successfully!");
            showSnackbar("Advertisement posted successfully!", "success");
            resetForm();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to post advertisement. Please try again.");
            showSnackbar(err.response?.data?.message || "Failed to post advertisement. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    const showSnackbar = (message, type) => {
        setSnackbar({
            message,
            type,
            open: true,
        });
        setTimeout(() => {
            setSnackbar({ ...snackbar, open: false });
        }, 3000); // Hide after 3 seconds
    };

    const resetForm = () => {
        setFormData({
            title: "",
            price: "",
            description: "",
            image: "",
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
                        <a href="/PostAd" className="text-gray-600 hover:text-gray-900">Add Post</a>
                    </nav>

                    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                        {/* Sidebar */}
                        <Sidebar />

                        {/* Main Content Area */}
                        <div className="space-y-8">
                            {/* Advertisement Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    {/* Title */}
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                                            Ad Title<span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            id="title"
                                            type="text"
                                            placeholder="Type here"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium mb-1">
                                            Price<span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            id="price"
                                            type="number"
                                            placeholder="Type here"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            required
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                                            Description<span className="text-pink-500">*</span>
                                        </label>
                                        <textarea
                                            id="description"
                                            placeholder="Type here"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            required
                                            className="w-full border rounded px-3 py-2 h-40"
                                        />
                                    </div>

                                    {/* Image URL */}
                                    <div>
                                        <label htmlFor="image" className="block text-sm font-medium mb-1">
                                            Image URL<span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            id="image"
                                            type="text"
                                            placeholder="Enter image URL"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            required
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className={`w-full bg-pink-600 hover:bg-pink-600 text-white px-4 py-2 rounded ${loading ? "opacity-50" : ""}`}
                                    disabled={loading}
                                >
                                    {loading ? "Posting..." : "Post Advertisement"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />

            {/* Snackbar */}
            {snackbar.open && (
                <div
                    className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-${snackbar.type === "success" ? "green" : "red"}-500 text-white px-4 py-2 rounded`}
                >
                    {snackbar.message}
                </div>
            )}
        </div>
    );
}
