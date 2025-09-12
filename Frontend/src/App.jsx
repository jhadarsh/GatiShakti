import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/user/common/Navbar';
import Landing from './pages/user/Landing';
import StationDashboard from "./pages/user/ShowSlots";
import AdminLayout from "./admin/Dashboard/layout";
import ComplaintForm from "./pages/user/Reporting";
import Footer from "./components/user/common/Footer";
import About from "./components/user/common/About";
import ContactUs from "./components/user/common/ContactUs";
import Guide from "./components/user/home/Guide";

function App() {
  return (
    <Router>
      <MainLayout />
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
        <Route path="/slots" element={<StationDashboard />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/reporting" element={<ComplaintForm />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactUs/>} />

      </Routes>
      <Guide/>

      {!hideLayout && <Footer/>}
    </>
  );
}

export default App;
