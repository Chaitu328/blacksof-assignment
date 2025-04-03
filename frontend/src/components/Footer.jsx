import React from 'react';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-100 to-blue-200 py-12" aria-labelledby="footer-heading">
      <div className="container mx-auto px-4">
        <h2 id="footer-heading" className="sr-only">Footer navigation</h2>
        
        {/* Top section with logo and navigation */}
        <div className="flex flex-col lg:flex-row justify-between mb-16">
          {/* Logo */}
          <div className="mb-8 lg:mb-0">
            <img 
              src={Logo} 
              alt="Supreme Group" 
              className="h-12"
              width="auto"
              height="48"
              loading="lazy"
            />
          </div>
          
          {/* Navigation columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Applications Column */}
            <section aria-labelledby="applications-heading">
              <h3 id="applications-heading" className="font-bold text-gray-800 mb-6">APPLICATIONS</h3>
              <ul className="space-y-4">
                <li><Link to="*" className="text-gray-600 hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-600">Apparel</Link></li>
                <li><Link to="*" className="text-gray-600 hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-600">Automotive</Link></li>
                <li><Link to="*" className="text-gray-600 hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-600">Filtration</Link></li>
                <li><Link to="*" className="text-gray-600 hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-600">Customised Nonwoven</Link></li>
              </ul>
            </section>
            
            {/* Company Column */}
            <section aria-labelledby="company-heading">
              <h3 id="company-heading" className="font-bold text-gray-800 mb-6">COMPANY</h3>
              <ul className="space-y-4">
                <li><Link to="*" className="text-gray-600 hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-600">Who We Are</Link></li>
                <li><Link to="*" className="text-gray-600 hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-600">Global Competency</Link></li>
                <li><Link to="*" className="text-gray-600 hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-600">Innovation</Link></li>
                <li><Link to="*" className="text-gray-600 hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-600">ESG Impact</Link></li>
              </ul>
            </section>
            
            {/* More Column */}
            <section aria-labelledby="more-heading">
              <h3 id="more-heading" className="font-bold text-gray-800 mb-6">MORE</h3>
              <ul className="space-y-4">
                <li><Link to="*" className="text-gray-600 hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-600">Contact Us</Link></li>
                <li><Link to="*" className="text-gray-600 hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-600">Careers</Link></li>
              </ul>
            </section>
            
            {/* Social Column */}
            <section aria-labelledby="social-heading">
              <h3 id="social-heading" className="font-bold text-gray-800 mb-6">FOLLOW US</h3>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://www.linkedin.com/company/supreme-group-company/" 
                    className="text-gray-600 hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on LinkedIn (opens in new tab)"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
        
        {/* Bottom section with copyright and address */}
        <div className="flex flex-col md:flex-row justify-between pt-8 border-t border-blue-300 text-gray-600 text-sm">
          <div className="mb-4 md:mb-0">
            ©2024. All Rights Reserved.
          </div>
          <address>
            Supreme House, 110, 16th Road, Chembur, Mumbai – 400071.
          </address>
        </div>
      </div>
    </footer>
  );
};

export default Footer;