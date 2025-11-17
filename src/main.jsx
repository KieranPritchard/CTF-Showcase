// Polyfill Buffer before any other imports that might need it
import { Buffer } from 'buffer'
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}
if (typeof globalThis !== 'undefined') {
  globalThis.Buffer = Buffer
}
if (typeof global !== 'undefined') {
  global.Buffer = Buffer
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/CTF-Showcase">
    <App />
  </BrowserRouter>,
)
