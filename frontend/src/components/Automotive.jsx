import React, { useState, useEffect, useRef } from 'react';

const Automotive = () => {
  const [activeSection, setActiveSection] = useState('passenger');
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollThreshold = 20;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY.current;
      if (Math.abs(scrollDiff) > scrollThreshold) {
        setActiveSection(scrollDiff > 0 ? 'commercial' : 'passenger');
        lastScrollY.current = currentScrollY;
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      setActiveSection(e.deltaY > 0 ? 'commercial' : 'passenger');
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveSection('passenger');
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveSection('commercial');
      }
    };

    const container = containerRef.current;

    window.addEventListener('scroll', handleScroll);
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div 
          className="w-12 h-12 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"
          aria-label="Loading content..."
        ></div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="bg-black text-white h-screen flex flex-col overflow-hidden"
      role="region"
      aria-label="Automotive solutions"
    >
      <div className="pt-16 pb-12 text-center">
        <h1 className="text-4xl font-light mb-2">
          Evolving the drive with <span className="font-bold">360-degree</span>
        </h1>
        <h1 className="text-4xl font-light">comprehensive solutions</h1>
      </div>
      <div className="flex flex-1">
        <div className="w-1/2 pl-16 pt-8">
          <div 
            className={`mb-16 transition-opacity duration-700 cursor-pointer ${activeSection === 'passenger' ? 'opacity-100' : 'opacity-40'}`} 
            onClick={() => setActiveSection('passenger')}
            tabIndex="0"
            role="button"
            aria-label="Passenger vehicles section"
            aria-current={activeSection === 'passenger'}
          >
            <h2 className={`text-3xl font-medium mb-2 transition-colors duration-500 ${activeSection === 'passenger' ? 'text-white' : 'text-gray-500'}`}>
              Passenger vehicles
            </h2>
            <p className={`text-lg font-light transition-colors duration-500 ${activeSection === 'passenger' ? 'text-white' : 'text-gray-500'}`}>
              Revving up innovation from interior to exterior.
            </p>
          </div>

          <div 
            className={`transition-opacity duration-700 cursor-pointer ${activeSection === 'commercial' ? 'opacity-100' : 'opacity-40'}`} 
            onClick={() => setActiveSection('commercial')}
            tabIndex="0"
            role="button"
            aria-label="Commercial vehicles section"
            aria-current={activeSection === 'commercial'}
          >
            <h2 className={`text-3xl font-medium mb-2 transition-colors duration-500 ${activeSection === 'commercial' ? 'text-white' : 'text-gray-500'}`}>
              Commercial vehicles
            </h2>
            <p className={`text-lg font-light transition-colors duration-500 ${activeSection === 'commercial' ? 'text-white' : 'text-gray-500'}`}>
              Advancing engineering for heavy-duty vehicles.
            </p>
          </div>
        </div>

        <div className="w-1/2 relative">
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${activeSection === 'passenger' ? 'opacity-100' : 'opacity-0'}`}>
            <img 
              src="/api/placeholder/500/300" 
              alt="Passenger vehicle parts showing interior and exterior components" 
              className="max-w-md" 
            />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${activeSection === 'commercial' ? 'opacity-100' : 'opacity-0'}`}>
            <img 
              src="/api/placeholder/500/300" 
              alt="Commercial vehicle parts including heavy-duty components" 
              className="max-w-md" 
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-8">
        <div className="flex space-x-4">
          <button
            className={`w-6 h-6 rounded-full border border-white ${activeSection === 'passenger' ? 'bg-white' : 'bg-transparent'}`}
            onClick={() => setActiveSection('passenger')}
            aria-label="Show passenger vehicles"
          />
          <button
            className={`w-6 h-6 rounded-full border border-white ${activeSection === 'commercial' ? 'bg-white' : 'bg-transparent'}`}
            onClick={() => setActiveSection('commercial')}
            aria-label="Show commercial vehicles"
          />
        </div>
        <button 
          className="ml-8 border border-white rounded-full w-10 h-10 flex items-center justify-center"
          aria-label="Next section"
          onClick={() => setActiveSection(activeSection === 'passenger' ? 'commercial' : 'passenger')}
        >
          <span className="block w-4 h-4 border-l-2 border-r-2 border-white" />
        </button>
      </div>
    </div>
  );
};

export default Automotive;