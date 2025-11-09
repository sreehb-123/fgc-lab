import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PageProvider } from './context/PageContext.jsx'
import { AuthProvider  } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PageProvider>  
    <App />
    </PageProvider>
    </AuthProvider>
  </StrictMode>,
)
