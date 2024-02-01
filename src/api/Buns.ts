import {HouseWithBuns, LatitudeLongitude} from "../types/Buns.ts";

const bunLocation = (name: string, marker: LatitudeLongitude): HouseWithBuns => ({
    name: name,
    description: "Hyggelig sted blah blah blah blahHyggelig sted blah blah blah blahHyggelig sted blah blah blah blahHyggelig sted blah blah blah blahHyggelig sted blah blah blah blahHyggelig sted blah blah blah blah",
    marker: marker,
    visited: [new Date()],
    rating: 5,
    pictures: ['/boller-placeholder.jpeg'],
    features: ['🤩', '✨'],
    servings: ['Vaniljesnurrer', 'Kanelsnurrer'],
    type: ['Middag'],
    by: "@vegaasen",
    added: new Date(),
    www: 'http://www.www.www',
    comment: ''
})

export const fetchAllTheBuns = async (): Promise<HouseWithBuns[]> =>
    Promise.resolve([
        bunLocation("Mjonøy", {latitude: 59.6344, longitude: 7.7982327}),
        bunLocation("Haukeliseter fjellstue DNT", {latitude: 59.8237931, longitude: 7.1916304}),
        bunLocation("Akerhaugen Gård", {latitude: 59.396586, longitude: 9.118245}),
        bunLocation("Gardsbutikk. Gvarv Frukt og Bær", {latitude: 59.396573, longitude: 9.1182449}),
        bunLocation("Bø Brød", {latitude: 59.39656, longitude: 9.1182449}),
        bunLocation("ELT bakeri", {latitude: 61.6355067, longitude: 10.3340612}),
        bunLocation("Bakeriet i Lom", {latitude: 61.8378516, longitude: 8.5648697}),
        bunLocation("Eidum Gårdsbakeri", {latitude: 63.4435786, longitude: 10.9789545}),
        bunLocation("Øverland håndverksbakeri", {latitude: 62.9277387, longitude: 7.6049291}),
        bunLocation("Fredag & Fretland Bakeri", {latitude: 61.0974248, longitude: 7.4750224}),
        bunLocation("Drivhuset Bageri & Gårdsutsalg", {latitude: 58.7405474, longitude: 5.6899155}),
        bunLocation("Molinå Bakery", {latitude: 58.9710419, longitude: 5.7371277}),
        bunLocation("THE ODD BAKERY AS", {latitude: 58.1508821, longitude: 7.9935184}),
        bunLocation("Farine", {latitude: 59.9115335, longitude: 10.7789724}),
        bunLocation("BIT BYPORTEN", {latitude: 59.9117412, longitude: 10.7483199}),
        bunLocation("Harmoni Håndverksbakeri AS", {latitude: 59.1396618, longitude: 9.6507114}),
        bunLocation("Bollebar", {latitude: 59.9111776, longitude: 10.7247522}),
        bunLocation("Byrkjedalstunet", {latitude: 58.7796544, longitude: 6.3139549}),
        bunLocation("Bakergaarden Café", {latitude: 59.481309, longitude: 11.6519671}),
        bunLocation("Fattigmann", {latitude: 59.6702831, longitude: 9.6493556}),
    ])
