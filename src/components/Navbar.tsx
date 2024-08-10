"use client";

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useLocalStorageUser } from './useLocalStorageUser';
import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import { auth } from '@/firebaseConfig';

// Configurable links
const navLinks = [
  { href: '/', label: 'Job Search' },
  { href: '/jobpost', label: 'Post A Job' },
  { href: '/about', label: 'About Us' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const user = useLocalStorageUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar-center">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link href="/" className="text-primary">
              MySite NAME
            </Link>
          </div>

          {/* Hamburger Menu */}
          <div className="block lg:hidden">
            <button 
              className="btn btn-primary" 
              type="button" 
              aria-label="Toggle menu" 
              onClick={toggleMenu}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Desktop Navbar Links */}
          <div className="hidden lg:flex lg:space-x-4">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href} className="btn btn-ghost">
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowLogoutPopup(!showLogoutPopup)}
                  className="btn btn-ghost"
                >
                  {user.email}
                </button>
                {showLogoutPopup && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn btn-ghost">
                Login/Register
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-base-200`}>
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`block px-4 py-2 text-primary ${index < navLinks.length - 1 ? 'border-b border-base-300' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowLogoutPopup(!showLogoutPopup)}
              className="block px-4 py-2 text-primary w-full text-left"
            >
              {user.email}
            </button>
            {showLogoutPopup && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="block px-4 py-2 text-primary">
            Login/Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
