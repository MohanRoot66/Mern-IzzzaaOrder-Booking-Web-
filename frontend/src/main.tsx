import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './global.css'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './AppRoutes.tsx'
import AuthProvider from './auth/AuthProvider.tsx'
import {QueryClient,QueryClientProvider} from "react-query"
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus : false,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
          <Toaster visibleToasts={1} position='top-right' richColors/>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
