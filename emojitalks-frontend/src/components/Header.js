import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-800 to-blue-500 relative">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src="EmojiTalks.png"
          alt="EmojiTalk Logo"
          className="h-10 w-10 mr-2"
        />
        <span className="font-bold text-xl text-white">EmojiTalk</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-4">
        <Link
          to="/"
          className="font-bold px-4 py-2 bg-blue-700 text-white rounded hover:border border-white transition"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="font-bold px-4 py-2 bg-blue-700 text-white rounded hover:border border-white transition"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="font-bold px-4 py-2 bg-blue-700 text-white rounded hover:border border-white transition"
        >
          Contact
        </Link>
        <Link
          to="/privacy-policy"
          className="font-bold px-4 py-2 bg-blue-700 text-white rounded hover:border border-white transition"
        >
          Privacy Policy
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="text-white text-2xl md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-3 py-4 px-6 md:hidden z-50">
          <Link
            to="/"
            className="font-bold text-blue-700 hover:text-purple-700"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-bold text-blue-700 hover:text-purple-700"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="font-bold text-blue-700 hover:text-purple-700"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/privacy-policy"
            className="font-bold text-blue-700 hover:text-purple-700"
            onClick={() => setIsOpen(false)}
          >
            Privacy Policy
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
