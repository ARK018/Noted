import React, { useState } from "react";
import { Rocket } from "lucide-react";

const KanbanComingSoon = () => {
  const [buttonText, setButtonText] = useState("Notify Me");
  const [isNotified, setIsNotified] = useState(false);

  const handleNotifyClick = () => {
    setButtonText("You're on the list!");
    setIsNotified(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white p-4">
      <div className="relative">
        <Rocket className="w-24 h-24 md:w-32 md:h-32 text-[#c4e456]" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 text-center mb-4 mt-8">
        Kanban Board Launch
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 text-center max-w-2xl">
        Get ready for a productivity boost! Our Kanban board is in the final
        stages of development. Soon you'll be organizing tasks with unparalleled
        efficiency.
      </p>
      <div className="mt-12">
        <button
          onClick={handleNotifyClick}
          className={`px-8 py-3 bg-[#c4e456] text-gray-800 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
            isNotified ? "cursor-not-allowed" : "hover:bg-[#b3d345]"
          }`}
        >
          {buttonText}
        </button>
      </div>
      <div className="absolute bottom-0 left-[68px] right-0 h-16 bg-gradient-to-t from-[#c4e456] to-transparent" />
    </div>
  );
};

export default KanbanComingSoon;
