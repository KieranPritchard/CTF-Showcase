import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WriteUps from './pages/WriteUps'
import Contact from './pages/Contact'
import WriteUpPage from './pages/WriteUpPage'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    /* Wrapped in hash router to stop 404 pages on refresh */
    <HashRouter>
      {/* This makes the navigation bar always render */}
      <Navbar />
      {/* Stores the routes of the website */}
      <Routes>
        {/* This renders pages based on the current link */}
        <Route path="/" element={<Home />} />
        <Route path="/write-ups" element={<WriteUps />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/writeups/:slug" element={<WriteUpPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App