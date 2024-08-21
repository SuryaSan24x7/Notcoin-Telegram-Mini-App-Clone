import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react';
//manifestUrl="https://memetap-suryasan24x7s-projects.vercel.app/tonconnect-manifest.json"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider >
        
 <React.StrictMode>
    <App />
  </React.StrictMode>,
  </TonConnectUIProvider>
)
