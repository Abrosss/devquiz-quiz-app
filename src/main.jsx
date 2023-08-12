import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom'; 
import App from './App'
import UserProvider from './context/User'

createRoot(document.getElementById('root')).render(
    <UserProvider>
        <App />
    </UserProvider>


)
