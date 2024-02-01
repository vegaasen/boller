import React from 'react'
import ReactDOM from 'react-dom/client'
import BunLocator from './BunLocator.tsx'
import './index.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

ReactDOM
    .createRoot(document.getElementById('root')!)
    .render(
        <React.StrictMode>
            <img className='w-6 ml-4 mt-4' src='/bun-logo.webp' alt='en vakker bolle'/>
            <Header/>
            <BunLocator/>
            <Footer/>
        </React.StrictMode>,
    )
