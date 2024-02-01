export type BunFeatures = '🤩' | '✨'
export type BunServing = 'Kanelsnurrer' | 'Vaniljesnurrer' | 'osv..'
export type BunEatingVariant = 'Boller' | 'Lønsj' | 'Middag'

export interface LatitudeLongitude {
    latitude: number
    longitude: number
}

export interface HouseWithBuns {
    name: string
    description: string
    comment: string
    marker: LatitudeLongitude
    visited: Date[]
    rating: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
    pictures: string[]
    features: BunFeatures[]
    servings: BunServing[]
    www: string
    type: BunEatingVariant[]
    by: string
    added: Date
}

export type BunsState = {
    buns: HouseWithBuns[]
    setBuns: (buns: HouseWithBuns[]) => void
}

export type CurrentBunLoverState = {
    locationMarker: LatitudeLongitude
    setLocationMarker: (location: LatitudeLongitude) => void
}