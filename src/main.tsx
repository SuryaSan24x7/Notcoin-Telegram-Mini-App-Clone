import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl="https://memetap-suryasan24x7s-projects.vercel.app/tonconnect-manifest.json"
  actionsConfiguration={{
    twaReturnUrl: 'https://t.me/noob_memelord_nbot/start'
  }}>
        
 <React.StrictMode>
    <App />
  </React.StrictMode>,
  </TonConnectUIProvider>
)
