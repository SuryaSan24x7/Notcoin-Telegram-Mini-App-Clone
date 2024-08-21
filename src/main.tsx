import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl="https://github.com/OpenProduct/openmask-extension/blob/main/public/manifest.json">
        
 <React.StrictMode>
    <App />
  </React.StrictMode>,
  </TonConnectUIProvider>
)
