import React from "react";
import Navbar from "../components/Navbar";
import noted_video from "../assets/noted_video.mp4";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/context/AuthContext";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleSignupClick = () => {
    if (user) {
      navigate("/dashboard/notes");
    } else {
      navigate("/signup");
    }
  };

  const handleLearnMore = () => {
    window.open("https://github.com/ARK018/Noted", "_blank");
  };

  return (
    <div className="">
      <Navbar />
      <div className="w-full h-full mx-auto flex flex-col items-center">
        <div className=" max-w-[800px] my-14">
          <h1 className="relative text-4xl text-center tracking-wide leading-relaxed">
            Welcome to Noted
            <svg
              width="283"
              height="60"
              viewBox="0 0 283 157"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-14 left-[65%] transform -translate-x-1/2 -translate-y-1/2"
            >
              <path
                d="M60.8446 104.681C118.785 87.8437 178.301 81.6769 238.205 87.9731"
                stroke="#C4E456"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M5.39045 87.8345C55.5175 79.8587 105.795 72.3676 156.179 66.2096C186.03 62.5612 216.225 59.9384 246.266 62.7582C256.216 63.6922 267.802 64.2238 277.527 66.8296"
                stroke="#C4E456"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
            <br /> Organize, Prioritize, and Stay on Track
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Your ultimate tool for managing notes and maximizing productivity.
            Effortlessly capture your ideas, prioritize tasks, and set deadlines
            with our user-friendly and intuitive platform.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleSignupClick}
              className="px-6 py-2 bg-black text-white rounded-full font-semibold text-base hover:bg-black/80 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={handleLearnMore}
              className="px-6 py-2 bg-transparent text-black border-2 rounded-full font-semibold text-base hover:bg-black/5 transition-colors"
            >
              Learn More
            </button>
          </div>
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            className="w-full h-full mt-10 object-cover border rounded-lg shadow-lg"
          >
            <source src={noted_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Home;
