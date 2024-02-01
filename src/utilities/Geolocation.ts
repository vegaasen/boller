import {HouseWithBuns, LatitudeLongitude} from "../types/Buns.ts";

type BunLocationByDistance = { distance: number; bunLocation: HouseWithBuns }

const asRoundedFixedNumber = (num: number) => +(Math.round(num * 100) / 100).toFixed(2)

const distanceToBunLocation = (bunLoverLocation: LatitudeLongitude, bunLocation: HouseWithBuns) => {
    const {latitude: lat1, longitude: lon1} = bunLoverLocation
    const {marker: {latitude: lat2, longitude: lon2}} = bunLocation
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist: number = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344
    return dist
};

export const bunLocationsDistance = (
    bunLoverLocation: LatitudeLongitude,
    bunLocations: HouseWithBuns[]
): BunLocationByDistance[] =>
    bunLocations
        .map(bunLocation =>
            ({
                bunLocation,
                distance: asRoundedFixedNumber(distanceToBunLocation(bunLoverLocation, bunLocation))
            }))
        .sort((first, second) => first.distance > second.distance ? 1 : first.distance < second.distance ? -1 : 0)