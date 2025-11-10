import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/home'
import WriteUps from './pages/WriteUps'
import Contact from './pages/Contact'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write-ups" element={<WriteUps />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
