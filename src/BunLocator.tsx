import {BrowserRouter, Route, Routes} from "react-router-dom";
import TheBunsPage from "./pages/TheBuns/TheBunsPage.tsx";
import {useQuery} from "react-query";
import {BunsContext, CurrentBunLoverContext} from "./context/Contexts.ts";
import React, {useEffect, useState} from "react";
import {BunFilter, HouseWithBuns, HouseWithBunsId, LatitudeLongitude, LocationFilter} from "./types/Buns.ts";
import ContributePage from "./pages/ContributePage.tsx";
import SelectedBunLocationPage from "./pages/SelectedBunLocationPage.tsx";
import {fetchAllTheBuns} from "./api/Buns.ts";
import Header from "./components/Header.tsx";

const BunLocator = () => {
    const [buns, setBuns] = useState<HouseWithBunsId[]>([])
    const [filteredBuns, setFilteredBuns] = useState<HouseWithBuns[]>([])
    const [bunFilter, setBunFilter] = useState<BunFilter>('newest')
    const [locationFilter, setLocationFilter] = useState<LocationFilter>('all')
    const [locationMarker, setLocationMarker] = useState<LatitudeLongitude>({latitude: 0, longitude: 0})
    const {isSuccess, error, isLoading} = useQuery({
        queryKey: ['allBuns'],
        queryFn: () => fetchAllTheBuns(),
        onSuccess: buns => setBuns(buns)
    })
    useEffect(() => {
        setFilteredBuns(buns)
    }, [buns]);
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
    return isSuccess ? (
            <CurrentBunLoverContext.Provider value={{locationMarker, setLocationMarker}}>
                <BunsContext.Provider value={{buns, setBuns, filteredBuns, setFilteredBuns, bunFilter, setBunFilter, locationFilter, setLocationFilter}}>
                    <BrowserRouter basename='/'>
                        <Header/>
                        <Routes>
                            <Route path='/' element={<TheBunsPage/>}/>
                            <Route path='/b/:locationWithBuns' element={<SelectedBunLocationPage/>}/>
                            <Route path='/bidra' element={<ContributePage/>}/>
                        </Routes>
                    </BrowserRouter>
                </BunsContext.Provider>
            </CurrentBunLoverContext.Provider>
        )
        : <>Jeha..</>;
};

export default BunLocator
