import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/user/common/Navbar';
import Landing from './pages/user/Landing';
import StationDashboard from "./pages/user/ShowSlots";
import AdminLayout from "./admin/Dashboard/layout";
import ComplaintForm from "./pages/user/Reporting";

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
      </Routes>

      {!hideLayout && <footer className="bg-gray-900 text-white p-4 text-center">
        Footer content here
      </footer>}
    </>
  );
}

export default App;
