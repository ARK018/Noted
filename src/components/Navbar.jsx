import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleDashboardClick = () => {
    const selected = localStorage.getItem("selected");
    if (selected === "kanban") {
      localStorage.setItem("selected", "notes");
      navigate("/dashboard/notes");
    } else {
      navigate("/dashboard/notes");
    }
    console.log(selected);
  };

  return (
    <div className="bg-[#fffffb] w-full h-16 flex justify-between items-center px-3 sm:px-6 md:px-12 border border-black/5">
      <div
        onClick={handleHomeClick}
        className="flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg
          width="29"
          height="29"
          viewBox="0 0 66 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 sm:w-8 sm:h-8"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.73391 52.391C3.14407 45.891 12.4409 20.922 13.023 6.76998C16.3003 6.59029 22.6519 7.44967 26.207 7.76607C37.859 8.81297 51.309 10.1255 62.324 13.6606C62.1521 16.477 60.4334 21.7895 59.7459 24.8596C58.0936 32.258 56.4568 40.1256 55.3084 47.6136C55.0311 49.4261 54.2967 58.6916 53.7615 59.3986C48.3787 60.4377 34.6565 57.0158 28.7105 55.9611C24.5152 55.2189 20.5543 54.6134 16.3395 54.0236C14.3473 53.7423 4.69091 52.9886 3.73391 52.391ZM19.1679 42.7738C19.5156 43.1214 18.3359 43.2543 20.2226 43.5433C21.8515 43.7933 34.0236 43.5082 36.0156 43.4261C37.7148 43.3558 40.707 43.6332 41.1211 42.8832C40.6914 42.1917 36.9492 41.9613 35.9727 41.8207C32.2579 41.2933 21.9377 41.3714 19.1717 42.7738H19.1679ZM19.3242 29.0318C20.2499 29.8208 35.8902 29.3365 39.3832 29.3912C40.9457 29.4146 45.0277 29.8248 45.6488 29.2857C44.8128 27.8677 34.5198 27.1568 32.4688 27.149C31.3204 27.1451 19.6962 27.3716 19.3242 29.0318ZM19.3124 17.4268C20.4179 18.4385 39.1364 19.3956 42.9494 19.8526C44.1252 19.9932 50.0041 20.8878 50.6135 20.6495C50.5471 19.7237 50.0667 19.7706 47.6447 19.0753C46.3869 18.7159 45.2853 18.4385 43.9963 18.1534C37.9807 16.8292 29.1603 16.2042 22.9653 16.505C22.2622 16.5362 21.5356 16.5909 20.8364 16.6573C19.8599 16.7472 19.5591 16.6183 19.3091 17.4229L19.3124 17.4268ZM10.3866 5.75078C10.6366 6.59844 10.4921 6.0789 10.9257 6.30156L11.6249 6.54375C11.6562 6.49297 11.7499 6.57891 11.8046 6.61407C11.7499 7.30548 10.8515 11.5438 10.578 11.9305C9.93739 12.8406 7.14831 13.2821 6.28891 14.0985C5.42954 16.2469 6.82016 24.6805 6.25766 27.4815C5.60141 30.7549 4.05846 34.8057 3.20296 38.2155C2.26155 41.9733 1.44126 45.7936 0.792761 49.6135C0.519321 51.2346 0.0310415 54.0823 1.65214 55.1369C3.19904 56.1408 6.02324 55.6759 7.20294 56.2697C8.22634 58.0197 7.23028 62.2892 9.92954 63.0431C11.8201 63.5704 22.6135 60.6525 25.2655 60.0509C29.4178 59.1095 28.9803 59.2657 33.0858 60.0352C38.6092 61.0704 43.4298 62.1485 49.0978 62.5196C58.4103 63.1329 57.133 60.9805 57.84 52.6719C59.4923 51.7266 62.9533 51.7384 63.3673 49.3633C63.9377 46.1016 59.715 40.375 60.7384 35.3713C61.2306 32.9729 61.6955 30.5627 62.2345 28.1721L65.4962 13.9531C65.6251 10.9101 63.1759 10.5351 60.7189 9.90234C58.4181 9.30859 56.0119 8.85544 53.7501 8.24214C53.2853 6.47654 52.7032 4.55074 51.9532 2.91794C50.9102 0.648441 49.3516 0.66794 47.0782 1.18744C43.3594 2.039 39.6641 3.19914 35.9222 4.03904C27.5003 5.93354 32.7269 5.53124 23.6062 5.23434C19.8562 5.11325 15.4968 5.0234 11.7232 5.24997C10.8209 5.30465 10.7936 5.21481 10.3834 5.75388L10.3866 5.75078Z"
            fill="black"
          />
        </svg>

        <h1 className="font-overpass text-sm sm:text-base tracking-[5%] mt-1">
          NOTED
        </h1>
      </div>

      {user ? (
        <button
          onClick={handleDashboardClick}
          className="flex items-center justify-center px-4 sm:px-6 py-[5px] bg-transparent text-black border-2 rounded-full font-semibold text-sm sm:text-base hover:bg-black/5 transition-colors"
        >
          <p className="text-black font-medium text-sm sm:text-base">
            Dashboard
          </p>
        </button>
      ) : (
        <button
          onClick={handleSignInClick}
          className="flex items-center justify-center px-4 sm:px-6 py-[5px] bg-transparent text-black border-2 rounded-full font-semibold text-sm sm:text-base hover:bg-black/5 transition-colors"
        >
          <p className="text-black font-medium text-sm sm:text-base">Sign In</p>
        </button>
      )}
    </div>
  );
};

export default Navbar;
