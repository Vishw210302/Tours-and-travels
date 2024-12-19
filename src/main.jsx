import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { myApi } from './Api/Api.js'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApiProvider api={myApi}>
      <App />
    </ApiProvider>
  </StrictMode>,
)
