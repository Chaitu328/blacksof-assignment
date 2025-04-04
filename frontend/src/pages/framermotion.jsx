import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useRef } from 'react';
import Passenger from "../assets/passenger.mp4";
import Commercial from "../assets/commercial.mp4";

const VideoTransition = ({ activeSection }) => {
  const [parent] = useAutoAnimate({ duration: 700 });
  const passengerRef = useRef(null);
  const commercialRef = useRef(null);

  // Load video metadata before playback
  useEffect(() => {
    const loadVideo = (ref) => {
      if (ref.current) {
        ref.current.load().catch(e => {
          console.log('Video load error:', e);
        });
      }
    };

    loadVideo(passengerRef);
    loadVideo(commercialRef);
  }, []);

  return (
    <div ref={parent} className="w-1/2 relative aspect-video">
      {activeSection === 'passenger' && (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={passengerRef}
            src={Passenger}
            autoPlay
            loop
            muted
            playsInline
            onError={(e) => console.error('Passenger video error:', e.target.error)}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {activeSection === 'commercial' && (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={commercialRef}
            src={Commercial}
            autoPlay
            loop
            muted
            playsInline
            onError={(e) => console.error('Commercial video error:', e.target.error)}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default VideoTransition;