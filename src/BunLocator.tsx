import {BrowserRouter, Route, Routes} from "react-router-dom";
import TheBuns from "./pages/TheBuns.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {CurrentBunLoverContext} from "./context/Contexts.ts";
import {useEffect, useState} from "react";
import {LatitudeLongitude} from "./types/Buns.ts";

const queryClient = new QueryClient()

const BunLocator = () => {
    const [locationMarker, setLocationMarker] = useState<LatitudeLongitude>({latitude: 0, longitude: 0})
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({coords: {latitude, longitude}}) => setLocationMarker({latitude, longitude}),
                ({code}) => {
                    if (code == 1) {
                        console.error("Oh noes, no access");
                    } else if (code == 2) {
                        console.error("Oh noooes, no position?");
                    }
                }
            )
        }
    }, []);
    return (
        <CurrentBunLoverContext.Provider value={{locationMarker, setLocationMarker}}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter basename='/'>
                    <Routes>
                        <Route path='/' element={<TheBuns/>}/>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </CurrentBunLoverContext.Provider>
    );
};

export default BunLocator
