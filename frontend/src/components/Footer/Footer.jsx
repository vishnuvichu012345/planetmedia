import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '../../images/logo-white-2.png.png';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 pr-10 pl-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left Section: Logo and Copyright */}
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-2xl font-bold">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-20 h-auto" // Adjust width and height as needed
                        />
                    </Link>
                    <div className="h-4 w-px bg-red-500"></div>

                    {/* Copyright */}
                    <div className="text-sm text-gray-400">© Copyright 2024</div>
                </div>

                {/* Right Section: Social Media Icons */}
                <div className="flex gap-4">
                    <a
                        href="#"
                        className="text-gray-400 hover:text-white text-xl"
                        aria-label="Facebook"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-white text-xl"
                        aria-label="Twitter"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-white text-xl"
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-white text-xl"
                        aria-label="YouTube"
                    >
                        <FaYoutube />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
