import React from 'react'
import ReactDOM from 'react-dom/client'
import BunLocator from './BunLocator.tsx'
import './index.css'
import Footer from "./components/Footer.tsx";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

ReactDOM
    .createRoot(document.getElementById('root')!)
    .render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <BunLocator/>
            </QueryClientProvider>
            <Footer/>
        </React.StrictMode>,
    )
