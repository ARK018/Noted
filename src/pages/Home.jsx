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
    <div>
      <Navbar />
      <div className="bg-[#fffffb] w-full h-full mx-auto flex flex-col items-center">
        <div className="flex flex-col gap-3 max-w-[800px] my-20 px-6 md:px-12">
          <h1 className="relative font-semibold text-4xl text-center tracking-tight leading-tight md:leading-none">
            Welcome to Noted
            {/* <svg
              width="120"
              height="80"
              viewBox="0 0 283 157"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[86px] left-[75%] transform -translate-x-1/2 -translate-y-1/2"
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
            </svg> */}
            <br /> Organize, Prioritize, and{" "}
            <span
              className="relative inline-block border-2 p-1 rounded-lg border-[#C4E456] rotate-[-1.8deg] "
              // className="relative inline-block before:z-0
              //  before:content[''] before:absolute before:inset-0 before:bg-[#C4E456]/10 text-[#C4E456]"
            >
              Stay on Track
            </span>
          </h1>
          <p className="text-center text-xl leading-normal font-light text-gray-600 mt-2">
            Your ultimate tool for managing notes and maximizing productivity.
            Effortlessly capture your ideas, prioritize tasks, and set deadlines
            with our user-friendly and intuitive platform.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleSignupClick}
              className="px-6 py-2 bg-[#C4E456] text-black rounded-full font-semibold text-base hover:bg-[#c2de65] transition-colors"
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
