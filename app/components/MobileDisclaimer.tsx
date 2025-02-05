import React from "react";

const MobileDisclaimer = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50 md:hidden">
      <div className="text-white text-center p-8 bg-black bg-opacity-90 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          ⚠️ Stage Plotter is not yet optimized for mobile devices.
        </h2>
        <p className="text-lg">Please use a desktop for the best experience.</p>
      </div>
    </div>
  );
};

export default MobileDisclaimer;
