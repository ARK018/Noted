import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./lib/context/AuthContext";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Kanban from "./pages/Kanban";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="notes" element={<Notes />} />
                <Route path="kanban" element={<Kanban />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
