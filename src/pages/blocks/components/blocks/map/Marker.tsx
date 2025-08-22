import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MarkerProps {
  lat: number;
  lng: number;
  children?: React.ReactNode;
}

const Marker: React.FC<MarkerProps> = ({ lat, lng, children }) => {
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rippleRef.current) {
      gsap.fromTo(
        rippleRef.current,
        { scale: 0.8, opacity: 0.8 },
        {
          scale: 3,
          opacity: 0,
          duration: 2,
          delay: 1,
          repeat: -1,
          ease: "power1.out",
        }
      );
    }
  }, []);

  return (
    <div
      style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      lat={lat}
      lng={lng}
    >
      <div className="relative flex items-center justify-center">
        <div
          ref={rippleRef}
          className="absolute w-8 h-8 rounded-full bg-blue-400 opacity-50 pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="size-7 bg-blue-400 border-4 border-white rounded-full flex items-center justify-center select-none z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marker;
