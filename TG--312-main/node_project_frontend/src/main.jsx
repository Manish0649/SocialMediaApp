import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserSlice from './context/UserSlice.jsx'

createRoot(document.getElementById('root')).render(
     <UserSlice>
          <App />
     </UserSlice>
     
  
)
