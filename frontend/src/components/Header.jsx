import Logo from "../assets/logo.png";

const Header = () => {
    return (
        <nav className="bg-white py-4 px-6 flex justify-between items-center">
          {/* Logo Placeholder */}
          <div className="flex items-center">
            <img src={Logo} alt="logo is not placed"/>
          </div>
          
          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            <button className="bg-black text-black px-6 py-2 rounded-full hover:bg-cyan-500 transition duration-300 ">
              Contact Us
            </button>
            
            {/* LinkedIn Icon */}
            <a href="#" className="text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            
            {/* Language Toggle */}
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
              <span className="font-bold">ENG</span>
            </div>
          </div>
        </nav>
      );
};

export default Header;