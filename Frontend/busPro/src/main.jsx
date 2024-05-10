import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import './style.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <PayPalScriptProvider options={{ "client-id": "AWjV0jhYSqrPIXZp2I6ZTv1ls5k-GeRgfyamNd6BP-ZYRL3crOtHmymV5UJE0UKhdgJp-hm4NpJLjzFh" }}>
    <App />
    <ToastContainer />
    </PayPalScriptProvider>
  </BrowserRouter>,
)
// sb-nuzay30221342@personal.example.com