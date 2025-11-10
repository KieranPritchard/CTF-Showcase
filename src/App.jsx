import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/home'
import WriteUps from './pages/WriteUps'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write-ups" element={<WriteUps />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
