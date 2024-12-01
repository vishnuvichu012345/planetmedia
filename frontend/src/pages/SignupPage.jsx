import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Navbar/Header";
import Footer from "../components/Footer/Footer";
import { registerUser } from "../api/auth";
import register from '../images/login.png'
import logo from '../images/logo.png.png'


export default function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Concatenate firstName and lastName to form username
        const username = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

        try {
            const payload = {
                username,
                email: formData.email,
                password: formData.password,
            };

            const response = await registerUser(payload);
            const token = response.data.jwt;
            console.log("jwtToken", token)

            // Store the token securely
            localStorage.setItem("jwtToken", token);
            alert("Registration successful!");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 flex flex-col items-center justify-center">
                            <div className="mb-8 flex flex-col items-center">
                                <Link to="/" className="text-3xl font-bold">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="w-28 h-auto" // Adjust width and height as needed
                                />
                                </Link>
                                <p className="mt-2 text-sm text-gray-600">
                                Listbnb a Largest Classified Listing Marketplace offers perfect
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                Ads classifieds...
                                </p>
                            </div>

                            <div className="space-y-6 ">
                                <h2 className="text-2xl font-semibold flex flex-col items-center justify-center ">Create Your Account</h2>
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    {error && <p className="text-red-500">{error}</p>}

                                    <div>
                                        <label className="block text-sm mb-1">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your first name"
                                            className=" border border-gray-300 rounded p-2 w-96 text-lg"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your last name"
                                            className="w-full border border-gray-300 rounded p-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Type here"
                                            className="w-full border border-gray-300 rounded p-2"
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
                                            placeholder="Type here"
                                            className="w-full border border-gray-300 rounded p-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">
                                            Confirm Password <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Type here"
                                            className="w-full border border-gray-300 rounded p-2"
                                            required
                                        />
                                    </div>
                                    <button className="w-full bg-pink-600 hover:bg-pink-600 text-white py-2 rounded">
                                        Register
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="bg-pink-50 p-8 flex flex-col justify-center">
                            <div className="max-w-md mx-auto">
                                <img
                                    src={register}
                                    alt="Login illustration"
                                    className="mb-8 w-96 h-44 object-contain mx-auto"
                                />
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold mb-2">
                                        Already Have an Account?
                                    </h3>
                                    <p className="text-gray-600">
                                    To connect with us please login to our
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                    account if you are  having one already.
                                    </p>
                                    <Link
                                        to="/login"
                                        className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded"
                                    >
                                        Login
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
