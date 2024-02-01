import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {divIcon, icon, latLng, LatLngExpression, point} from "leaflet";
import {useQuery} from "react-query";
import {fetchAllTheBuns} from "../api/Buns.ts";
import {HouseWithBuns} from "../types/Buns.ts";
import {BunsContext, CurrentBunLoverContext} from "../context/Contexts.ts";
import {ReactNode, useContext, useState} from "react";
import {bunLocationsDistance} from "../utilities/Geolocation.ts";
import BunTile from "../components/BunTile.tsx";
import {clsx} from "clsx";

const norway: LatLngExpression = {lat: 61.6374106, lng: 9.4217057, alt: 5.88}

type SectionProps = { className?: string, children: ReactNode }

const Section = ({children, className = undefined}: SectionProps) =>
    <section className={clsx('mx-auto max-w-[1140px] px-4', className)}>
        {children}
    </section>

const BunLocationsClosestToMeOrJustPopular = () => {
    const {buns} = useContext(BunsContext)
    const {locationMarker} = useContext(CurrentBunLoverContext)
    const closestBuns = bunLocationsDistance(locationMarker, buns).slice(0, 5)
    if (closestBuns.length === 0) {
        return null
    }
    return <Section className='my-10 flex flex-col gap-32'>
        {closestBuns.map(({bunLocation, distance}, index) =>
            <BunTile
                key={`closest-${bunLocation.name}`}
                bunLocation={bunLocation}
                distanceFromBunLover={distance}
                oddOrEven={index % 2 === 0 ? "odd" : "even"}/>
        )}
    </Section>
}

const AllTheBunLocations = () => {
    const {buns} = useContext(BunsContext)
    const {locationMarker} = useContext(CurrentBunLoverContext)
    const zeBuns = bunLocationsDistance(locationMarker, buns);
    const closestBuns = zeBuns.slice(5, zeBuns.length)
    if (closestBuns.length === 0) {
        return null
    }
    return <Section className='my-10 flex flex-col gap-32'>
        {closestBuns.map(({bunLocation, distance}, index) =>
            <BunTile
                key={`${bunLocation.name}`}
                bunLocation={bunLocation}
                distanceFromBunLover={distance}
                oddOrEven={index % 2 === 0 ? "odd" : "even"}/>
        )}
    </Section>
}

const MapOBuns = () => {
    const {buns} = useContext(BunsContext)
    const {locationMarker} = useContext(CurrentBunLoverContext)
    if (buns) {
        return <MapContainer
            zoom={6}
            center={norway}
            scrollWheelZoom={false}
            className='h-dvh rounded-lg'
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {buns?.map(whereThereIsBuns =>
                <Marker
                    key={whereThereIsBuns.name}
                    icon={icon({iconUrl: '/bun-logo.webp', iconSize: point(20, 20)})}
                    position={latLng(whereThereIsBuns.marker.latitude, whereThereIsBuns.marker.longitude)}
                >
                    <Popup>{whereThereIsBuns.name}</Popup>
                </Marker>
            )}
            {
                locationMarker.longitude + locationMarker.latitude > 0 ?
                    <Marker
                        icon={
                            divIcon({
                                className: 'bg-transparent',
                                html: "<span style='height: 15px;width: 15px;background-color: cadetblue;border-radius: 50%;display: block;box-shadow: 0 0 0 5px #fff;opacity: .8'></span>"
                            })
                        }
                        position={latLng(locationMarker.latitude, locationMarker.longitude)}
                    >
                    </Marker>
                    : null
            }
        </MapContainer>
    }
    return null
}

const TheBuns = () => {
    const [buns, setBuns] = useState<HouseWithBuns[]>([])
    const {error, isLoading} = useQuery({
        queryKey: ['allBuns'],
        queryFn: () => fetchAllTheBuns(),
        onSuccess: buns => setBuns(buns)
    })

    return <div className='p-20 bg-yellow-shmellow'>
        <BunsContext.Provider value={{buns, setBuns}}>
            <BunLocationsClosestToMeOrJustPopular/>
            <MapOBuns/>
            <AllTheBunLocations/>
        </BunsContext.Provider>
    </div>
}

export default TheBuns