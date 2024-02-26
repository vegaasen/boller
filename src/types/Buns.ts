export type LocationFeatures = 'Sitteområde' | 'Toalett' | 'Parkering'
export type Offers = 'kanelboller' | 'vaniljeboller' | 'kaffe' | 'brød' | 'rundstykker' | 'vafler' | 'diverse' | 'påsmurt' | 'kanelsnurrer' | 'vaniljesnurrer' | 'fancy-snurrer' | 'kaker' | 'pizza'
export type BunFilter = 'closest-to-me' | 'rank' | 'best-diversity' | 'newest' | 'shop-name'
export type LocationFilter = 'all' | 'east' | 'west' | 'mid' | 'north' | 'south'

export interface LatitudeLongitude {
    latitude: number
    longitude: number
}

export interface HouseWithBuns {
    name: string
    description: string
    comment: string
    city: string
    marker: LatitudeLongitude
    visited: Date[]
    rating: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
    pictures: string[]
    features: LocationFeatures[]
    servings: Offers[]
    www: string
    by: string
    added: Date
}

export interface HouseWithBunsId extends HouseWithBuns {
    id: number
}

export type BunsState = {
    buns: HouseWithBunsId[]
    setBuns: (buns: HouseWithBunsId[]) => void
    bunFilter: BunFilter
    setBunFilter: (bunFilter: BunFilter) => void
    locationFilter: LocationFilter
    setLocationFilter: (locationFilter: LocationFilter) => void
    filteredBuns: HouseWithBuns[]
    setFilteredBuns: (buns: HouseWithBuns[]) => void
}

export type CurrentBunLoverState = {
    locationMarker: LatitudeLongitude
    setLocationMarker: (location: LatitudeLongitude) => void
}
