import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { e } from './lazy'
console.log(e)

import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
