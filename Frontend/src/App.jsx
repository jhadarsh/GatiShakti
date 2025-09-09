import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components-user/common/Navbar'
import Landing from './pages-user/Landing'

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </Router>
  )
}

export default App
