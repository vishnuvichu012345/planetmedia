import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Use useNavigate hook
import Header from "../components/Navbar/Header";
import Footer from "../components/Footer/Footer";
import { loginUser } from "../api/auth";  // Assuming you have a loginUser function in api/auth.js
import login from '../images/login.png'
import logo from '../images/logo.png.png'

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Initialize useNavigate hook

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                identifier: formData.username,
                password: formData.password,
            };

            // Call the login API to authenticate the user
            const response = await loginUser(payload);
            const token = response.data.jwt;

            console.log("JWT Token:", token);

            // Store the token securely
            localStorage.setItem("jwtToken", token);
            alert("Login successful!");

            // Redirect after successful login using navigate()
            navigate("/Myaccount");  // Use the navigate function to redirect

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during login.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
        <Header />
    
        <main className="flex-1 container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="grid md:grid-cols-2">
                    {/* Left Section */}
                    <div className="p-6 flex flex-col items-center justify-center">
                        <div className="mb-8 flex flex-col items-center text-center">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-24 h-auto" // Dynamically adjust size
                            />
                            <p className="mt-2 text-sm text-gray-600">
                                Listbnb a Largest Classified Listing Marketplace offers perfect
                            </p>
                            <p className="mt-2 text-sm text-gray-600">Ads classifieds...</p>
                        </div>
    
                        <div className="space-y-6 w-full max-w-md">
                            <h2 className="text-2xl font-semibold text-center">Login to Your Account</h2>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                {error && <p className="text-red-500">{error}</p>}
    
                                <div>
                                    <label className="block text-sm mb-1">
                                        Username <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Enter your username"
                                        className="w-full border border-gray-300 rounded p-3 text-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        className="w-full border border-gray-300 rounded p-3 text-lg"
                                        required
                                    />
                                </div>
                                <button className="w-full bg-pink-600 hover:bg-pink-600 text-white py-2 rounded">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
    
                    {/* Right Section */}
                    <div className="bg-pink-50 p-8 flex flex-col justify-center">
                        <div className="mx-auto max-w-md">
                            <img
                                src={login}
                                alt="Login illustration"
                                className="mb-8 w-full h-auto object-contain"
                            />
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">Don't Have an Account?</h3>
                                <p className="text-gray-600">
                                    To connect with us please register for a new
                                </p>
                                <p className="text-gray-600 mb-4">
                                    account if you are not having one already.
                                </p>
                                <Link
                                    to="/Register"
                                    className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    
        <Footer />
    </div>
    
    );
}
