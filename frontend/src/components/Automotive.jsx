import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Passenger from "../assets/passenger.mp4";
import Commercial from "../assets/commercial.mp4";

const Automotive = () => {
  const [activeSection, setActiveSection] = useState('passenger');
  const passengerVideoRef = useRef(null);
  const commercialVideoRef = useRef(null);

  const sections = {
    passenger: {
      video: Passenger,
      title: "Passenger vehicles",
      text: "Revving up innovation from interior to exterior.",
      ref: passengerVideoRef
    },
    commercial: {
      video: Commercial,
      title: "Commercial vehicles",
      text: "Advancing engineering for heavy-duty vehicles.",
      ref: commercialVideoRef
    }
  };

  // Handle scroll events
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        if (scrollDirection === 'down' && activeSection === 'passenger') {
          setActiveSection('commercial');
        } else if (scrollDirection === 'up' && activeSection === 'commercial') {
          setActiveSection('passenger');
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Reset videos when section changes
  useEffect(() => {
    if (passengerVideoRef.current) {
      passengerVideoRef.current.currentTime = 0;
      if (activeSection === 'passenger') {
        passengerVideoRef.current.play();
      } else {
        passengerVideoRef.current.pause();
      }
    }

    if (commercialVideoRef.current) {
      commercialVideoRef.current.currentTime = 0;
      if (activeSection === 'commercial') {
        commercialVideoRef.current.play();
      } else {
        commercialVideoRef.current.pause();
      }
    }
  }, [activeSection]);

  return (
    <div className="bg-black text-white h-screen flex flex-col overflow-hidden">
      <motion.div
       whileInView={{opacity:1,y:0}}
       initial={{opacity:0,y:-100}}
       transition={{duration:0.5}}


       className="pt-16 pb-12 text-center">
        <h1 className="text-4xl font-light mb-2">
          Evolving the drive with <span className="font-bold">360-degree</span>
        </h1>
        <h1 className="text-4xl font-light">comprehensive solutions</h1>
      </motion.div>

      <div className="flex flex-1 relative">
        {/* Text Content */}
        <div className="w-1/2 pl-16 pt-8 z-20">
          {Object.entries(sections).map(([key, section]) => (
            <motion.div
              key={key}
              className={`mb-16 cursor-pointer ${
                activeSection === key ? 'opacity-100' : 'opacity-40'
              }`}
              onClick={() => setActiveSection(key)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="text-3xl font-medium mb-2">
                {section.title}
              </h2>
              <p className="text-lg font-light">
                {section.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video Content */}
        <div className="w-1/2 relative">
          <AnimatePresence mode='wait'>
            {Object.entries(sections).map(([key, section]) => (
              activeSection === key && (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <video
                    ref={section.ref}
                    src={section.video}
                    autoPlay
                    muted
                    playsInline
                    className="max-w-md"
                    onEnded={() => console.log(`${key} video ended`)}
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center pb-8">
        {Object.keys(sections).map((key) => (
          <motion.button
            key={key}
            className={`w-6 h-6 rounded-full border mx-2 ${
              activeSection === key ? 'bg-white border-white' : 'border-gray-500'
            }`}
            onClick={() => setActiveSection(key)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Automotive;