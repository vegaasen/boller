import {createContext} from "react";
import {BunsState, CurrentBunLoverState} from "../types/Buns.ts";

export const BunsContext = createContext<BunsState>({
    buns: [],
    setBuns: () => {
    },
    bunFilter: 'rank',
    setBunFilter: () => {
    },
    locationFilter: 'all',
    setLocationFilter: () => {
    },
    filteredBuns: [],
    setFilteredBuns: () => {
    },
})

export const CurrentBunLoverContext = createContext<CurrentBunLoverState>({
    locationMarker: {latitude: 0, longitude: 0},
    setLocationMarker: () => {
    }
})
