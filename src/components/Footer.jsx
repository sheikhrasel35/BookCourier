import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal whitebg text-base-content p-10">
        {/* Company Info */}
        <aside className="flex flex-col ml-0 md:ml-12">
          <img src="/logo.png" alt="BookCourier Logo" className="w-14 h-14 mb-2" />
          <h2 className="text-2xl font-bold text-green-500">BookCourier</h2>
          <p className="mt-1 text-sm text-secondary">
            A library-to-home delivery platform <br /> 
            where users can borrow and return books without visiting the library. <br />
            Request books, track deliveries, and enjoy hassle-free reading.
          </p>
        </aside>

        {/* Services */}
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="books" className="link link-hover">Browse Book</Link>
          <Link to="/dashboard/wishlist" className="link link-hover">Wishlist</Link>
          <Link to="/coverage" className="link link-hover">Nearby Library</Link>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="about" className="link link-hover">About Us</Link>
          <Link to="contact" className="link link-hover">Contact Us</Link>
          <Link to="/terms-of-use" className="link link-hover">Terms of use</Link>
          <Link to="/privacy-policy" className="link link-hover">Privacy policy</Link>
        </nav>

        {/* Social Links + Contact Info */}
        <nav>
          <h6 className="footer-title">Connect & Contact</h6>
          <div className="flex flex-col">
            <div className="mt-0 text-sm">
              <p>Email: mahbub.devx@gmail.com</p>
              <p>Phone: +8801739670124</p>
            </div>
            <div className="flex space-x-4 text-xl mt-4">
              {/* Social icons with hover brand colors */}
              <a href="https://www.facebook.com/IamMahbubZaman" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#1877F2]">
                <FaFacebookF />
              </a>
              <a href="https://x.com/mahbub_zaman_" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#08629b]">
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com/md_mahbub_zaman/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#C13584]">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/md-mahbub-zaman/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#0A66C2]">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </nav>
      </footer>

      <div className="w-full mt-0 whitebg">
        <hr className="border-gray-400" />
        <p className="text-center text-sm p-2 text-secondary">
          &copy; {new Date().getFullYear()} All rights reserved by 
          <Link to="https://mahbub-zaman.netlify.app/" target="_blank" rel="noopener noreferrer">
            <span className='font-bold text-green-500 hover:text-[#1DA1F2] hover:cursor-pointer'> MD Mahbub Zaman</span>
          </Link>

        </p>
      </div>
    </div>
  );
};

export default Footer;
