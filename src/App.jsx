import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import Adminlayout from './components/Layout/AdminLayout';
import BlogsPage from "./pages/admin/BlogsPage.jsx";
import AllEnquiriesPage from "./pages/admin/AllEnquiriesPage.jsx";
import ProfileAdmin from "./pages/admin/ProfileAdmin.jsx";

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Adminlayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="blogs" element={<BlogsPage />}/>
          <Route path="enquiries" element={<AllEnquiriesPage />}/>
          <Route path="profile" element={<ProfileAdmin />}/>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
