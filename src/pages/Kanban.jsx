import React, { useState } from "react";
import { Rocket } from "lucide-react";

const KanbanComingSoon = () => {
  const [buttonText, setButtonText] = useState("Notify Me");
  const [notify, setNotify] = useState(false);

  const handleNotifyClick = () => {
    localStorage.setItem("Notify", "true");
    setNotify(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white p-2 sm:p-4 md:p-8 relative">
      <div className="relative">
        <Rocket className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 text-[#c4e456]" />
      </div>
      <h1 className="text-xl sm:text-3xl md:text-6xl font-bold text-gray-800 text-center mb-2 sm:mb-4 mt-6 sm:mt-8">
        Kanban Board Launch
      </h1>
      <p className="text-sm sm:text-base md:text-2xl text-gray-600 text-center max-w-xs sm:max-w-xl md:max-w-2xl">
        Get ready for a productivity boost! Our Kanban board is in the final
        stages of development. Soon you'll be organizing tasks with unparalleled
        efficiency.
      </p>
      <div className="mt-4 sm:mt-6 w-full flex justify-center">
        {localStorage.getItem("Notify") ? (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-[#ebffa8] text-[#000000] rounded-full text-base sm:text-lg font-semibold"
            disabled
          >
            You're on the list!
          </button>
        ) : (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-[#c4e456] hover:bg-[#b3d345] text-gray-800 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={handleNotifyClick}
          >
            Notify Me
          </button>
        )}
      </div>
      <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-10 sm:h-16 bg-gradient-to-t from-[#c4e456] to-transparent" />
    </div>
  );
};

export default KanbanComingSoon;
