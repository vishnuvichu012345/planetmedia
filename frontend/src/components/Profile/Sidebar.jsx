import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Ask for confirmation before logging out
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            // Clear the token from localStorage
            localStorage.removeItem('jwtToken'); // Adjust based on how you're storing the token

            // Redirect to the login page or home page
            navigate('/login'); // You can also navigate to '/' if you prefer redirecting to the home page
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <aside className="space-y-2">
                <nav className="space-y-2">
                    <NavLink
                        to="/Myaccount"
                        className={({ isActive }) => 
                            isActive 
                                ? 'block bg-black text-white rounded-lg py-2 px-4' 
                                : 'block text-gray-600 hover:text-gray-900 py-2 px-4'
                        }
                    >
                        My Account
                    </NavLink>
                    <NavLink
                        to="/ProfileUpdate"
                        className={({ isActive }) => 
                            isActive 
                                ? 'block bg-black text-white rounded-lg py-2 px-4' 
                                : 'block text-gray-600 hover:text-gray-900 py-2 px-4'
                        }
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to="/ViewAds"
                        className={({ isActive }) => 
                            isActive 
                                ? 'block bg-black text-white rounded-lg py-2 px-4' 
                                : 'block text-gray-600 hover:text-gray-900 py-2 px-4'
                        }
                    >
                        Ads
                    </NavLink>
                    <NavLink
                        to="/PostAd"
                        className={({ isActive }) => 
                            isActive 
                                ? 'block bg-black text-white rounded-lg py-2 px-4' 
                                : 'block text-gray-600 hover:text-gray-900 py-2 px-4'
                        }
                    >
                        Post Ad
                    </NavLink>
                    <NavLink
                        to="/MarketplacePage"
                        className={({ isActive }) => 
                            isActive 
                                ? 'block bg-black text-white rounded-lg py-2 px-4' 
                                : 'block text-gray-600 hover:text-gray-900 py-2 px-4'
                        }
                    >
                        Market Place
                    </NavLink>
                    {/* Logout Link with handleLogout */}
                    <button
                        onClick={handleLogout}
                        className="block text-gray-600 hover:text-gray-900 py-2 px-4 w-full text-left"
                    >
                        Logout
                    </button>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
