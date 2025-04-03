import React from 'react';

const NotFoundComponent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <h1 className="text-blue-600 text-9xl font-bold mb-6">404</h1>
      <p className="text-gray-800 text-xl mb-12">The page you have requested doesn't exist.</p>
      <a 
        href="/" 
        className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-full transition duration-300"
      >
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFoundComponent;