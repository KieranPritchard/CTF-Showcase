import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WriteUps from './pages/WriteUps'
import Contact from './pages/Contact'
import WriteUpPage from './pages/WriteUpPage'
import Navbar from './components/Navbar/Navbar'

// Optional NotFound component
const NotFound = () => <div>404 - Page Not Found</div>

function App() {
  return (
    // HashRouter ensures pages load correctly even on refresh
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      {/* Define all routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/#/write-ups" element={<WriteUps />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/write-ups/:slug" element={<WriteUpPage />} />
        <Route path="*" element={<NotFound />} /> {/* catch-all fallback */}
      </Routes>
    </Router>
  )
}

export default App