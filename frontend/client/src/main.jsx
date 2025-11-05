import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './admin/context/AdminContext.jsx'
import DoctorContextProvider from './admin/context/DoctorContext.jsx'
import AppContextProvider from './admin/context/AppContext.jsx'
import AppContextProviderMain from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <DoctorContextProvider>
          <AppContextProvider>
            <AppContextProviderMain>
              <App />
            </AppContextProviderMain>
          </AppContextProvider>
        </DoctorContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </StrictMode>
)
