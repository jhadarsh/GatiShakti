import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/user/common/Navbar'
import Landing from './pages/user/Landing'
import StationDashboard from "./pages/user/ShowSlots";

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/slots" element={<StationDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
