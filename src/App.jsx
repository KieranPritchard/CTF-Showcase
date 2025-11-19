import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import WriteUps from './pages/WriteUps'
import Contact from './pages/Contact'
import WriteUpPage from './pages/WriteUpPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      {/* This makes the navigation bar always render */}
      <Navbar />
      <Routes>
        {/* This renders pages based on the current link */}
        <Route path="/" element={<Home />} />
        <Route path="/write-ups" element={<WriteUps />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/writeups/:slug" element={<WriteUpPage />} />
      </Routes>
    </div>
  )
}

export default App
