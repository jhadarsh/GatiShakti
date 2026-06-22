import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/user/common/Navbar";
import Landing from "./pages/user/Landing";
import AdminLayout from "./admin/Dashboard/Adminlayout.jsx";
import Reporting from "./pages/user/Reporting";
import Footer from "./components/user/common/Footer";
import About from "./components/user/common/About";
import Guide from "./components/user/home/Guide";
import Slots from "./pages/user/Slots.jsx";
import PlanJourney from "./pages/user/Planjourney.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./components/user/common/Login.jsx";
import Signup from "./components/user/common/Signup.jsx";
function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </Router>
  );
}

// Separate component to handle conditional layout
function MainLayout() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin");
  // hides navbar/footer if route begins with /admin

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/plan" element={<PlanJourney />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Guide />
      {/* uvicorn app:app --reload */}
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
