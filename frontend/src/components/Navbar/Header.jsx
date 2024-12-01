import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut } from "react-icons/fi"; // Import the user icon and logout icon
import logo from '../../images/logo.png.png';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if a token is available in localStorage (or sessionStorage)
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true); // User is logged in
        }
    }, []);

    const handleLogout = () => {
        // Ask for confirmation before logging out
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            // Clear the token from localStorage (or sessionStorage)
            localStorage.removeItem('jwtToken');
            setIsLoggedIn(false); // Update state to reflect logout
            navigate('/'); // Redirect to home page or login page
        }
    };

    return (
        <header className="border-b pr-10 pl-10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-20 h-auto" // Adjust width and height as needed
                    />
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        // If the user is logged in, show the Logout button
                        <button 
                            onClick={handleLogout}
                            className="text-sm font-medium flex items-center gap-2 text-gray-700"
                        >
                            <FiLogOut className="text-lg" /> {/* Logout Icon */}
                            Logout
                        </button>
                    ) : (
                        // If the user is not logged in, show the Sign In button
                        <Link to="/login" className="text-sm font-medium flex items-center gap-2">
                            <FiUser className="text-lg" /> {/* Person Icon */}
                            Sign In
                        </Link>
                    )}

                    {/* Post Your Ad Button */}
                    <button className="bg-pink-600 hover:bg-pink-600 text-white py-2 px-4 rounded flex items-center">
                        Post Your Ad
                        <svg
                            className="ml-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
