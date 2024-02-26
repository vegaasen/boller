import {HouseWithBuns} from "../types/Buns.ts";

export const asGoogleMapsDirectionsURL = (bunLocation: HouseWithBuns) =>
    `https://www.google.com/maps/dir//${bunLocation.marker.latitude},${bunLocation.marker.longitude}/@${bunLocation.marker.latitude},${bunLocation.marker.longitude},16z?entry=ttu`
