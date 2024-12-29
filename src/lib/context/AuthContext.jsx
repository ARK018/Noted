import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    checkUserStatus();
  }, []);

  const registerUser = async (userInfo) => {
    try {
      await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.name
      );
      await loginUser(userInfo);
    } catch (error) {
      console.error("Register Error:", error);
    }
  };

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      setUser(accountDetails);
      // Store user details in localStorage
      localStorage.setItem("userSession", JSON.stringify(accountDetails));
      navigate("/dashboard/notes", { replace: true });
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      // Clear localStorage on logout
      localStorage.removeItem("userSession");
      navigate("/signin");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const checkUserStatus = async () => {
    setLoading(true);
    try {
      // Check localStorage first
      const savedSession = localStorage.getItem("userSession");
      if (savedSession) {
        // Verify the session is still valid with Appwrite
        const accountDetails = await account.get();
        setUser(accountDetails);
      }
    } catch (error) {
      // If session is invalid, clear localStorage
      localStorage.removeItem("userSession");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
    checkUserStatus,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
