"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-base-300 py-6">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h4 className="text-lg font-bold">Company Name</h4>
            <p className="text-sm">© {new Date().getFullYear()} Company Name. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/" className="text-sm">
                Privacy Policy
            </Link>
            <Link href="/" className="text-sm">
                Terms of Service
            </Link>
            <Link href="/contact" className="text-sm">
                Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
