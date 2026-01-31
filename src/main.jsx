// Polyfill Buffer before any other imports that might need it
import { Buffer } from 'buffer'
// Provide Buffer globally for gray-matter and other Node-compatible libs
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}
if (typeof globalThis !== 'undefined') {
  globalThis.Buffer = Buffer
}
if (typeof global !== 'undefined') {
  global.Buffer = Buffer
}

// Imports the functions and the styling
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Creates react root
createRoot(document.getElementById('root')).render(
  // Opens the app in strict mode
  <StrictMode>
    {/* Renders the app */}
    <App />
  </StrictMode>
)