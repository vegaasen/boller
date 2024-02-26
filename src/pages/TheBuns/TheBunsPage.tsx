import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {divIcon, icon, latLng, LatLngExpression, point} from "leaflet";
import {BunsContext, CurrentBunLoverContext} from "../../context/Contexts.ts";
import {ReactNode, useContext, useEffect} from "react";
import {bunLocationsDistance} from "../../utilities/Geolocation.ts";
import {BunTiles} from "../../components/BunTile.tsx";
import {clsx} from "clsx";
import {AmberButton} from "../../components/Buttons.tsx";
import {scrollTo} from "../../utilities/Document.ts";
import {useNavigate} from "react-router-dom";
import RegisterNewBunsInformation from "./Contribute.tsx";

const norway: LatLngExpression = {lat: 61.6374106, lng: 9.4217057, alt: 5.88}

type SectionProps = { className?: string, children: ReactNode }

const Section = ({children, className = undefined}: SectionProps) =>
    <section className={clsx('mx-auto px-4', className)}>
        {children}
    </section>

const AllTheBunLocations = () => {
    const {buns, filteredBuns, setFilteredBuns, setLocationFilter, bunFilter, setBunFilter} = useContext(BunsContext)
    const {locationMarker} = useContext(CurrentBunLoverContext)
    useEffect(() => {
        setLocationFilter('all')
        if (bunFilter === "rank") {
            setFilteredBuns(buns.sort((a, b) => a.rating > b.rating ? -1 : a.rating === b.rating ? 0 : 1))
        } else if (bunFilter === "closest-to-me") {
            setFilteredBuns(bunLocationsDistance(locationMarker, buns)
                .sort((first, second) => first.distance > second.distance ? 1 : first.distance < second.distance ? -1 : 0)
                .filter(({distance}) => distance < 100)
                .map(({bunLocation}) => bunLocation))
        } else if (bunFilter === "best-diversity") {
            setFilteredBuns(buns)
        } else if (bunFilter === "shop-name") {
            setFilteredBuns(buns.sort((a, b) => a.name.localeCompare(b.name)))
        } else if (bunFilter === "newest") {
            setFilteredBuns(buns
                .sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
                .slice(0, 10))
        }
    }, [bunFilter])
    return <Section className='my-10 flex flex-col gap-5'>
        <div>
            <fieldset className='flex justify-center py-10 gap-2'>
                <AmberButton onClick={() => setBunFilter('closest-to-me')} highlighted={bunFilter === 'closest-to-me'}>Nærmest meg 👋</AmberButton>
                <AmberButton onClick={() => setBunFilter('rank')} highlighted={bunFilter === 'rank'}>Høyest rangert ⭐</AmberButton>
                <AmberButton onClick={() => setBunFilter('best-diversity')} highlighted={bunFilter === 'best-diversity'}>Best utvalg 🍩</AmberButton>
                <AmberButton onClick={() => setBunFilter('newest')} highlighted={bunFilter === 'newest'}>Nyeste 🎉</AmberButton>
                <AmberButton onClick={() => setBunFilter('shop-name')} highlighted={bunFilter === 'shop-name'}>Alfabetisk A-Z</AmberButton>
            </fieldset>
        </div>
        <div>
            <BunTiles bunLocations={bunLocationsDistance(locationMarker, filteredBuns)}/>
        </div>
    </Section>
}

const MapOBuns = () => {
    const navigate = useNavigate()
    const {buns, filteredBuns, setFilteredBuns, locationFilter, setLocationFilter, setBunFilter} = useContext(BunsContext)
    const {locationMarker} = useContext(CurrentBunLoverContext)
    useEffect(() => {
        if (locationFilter === 'south') {
            setFilteredBuns(buns.filter(location => location.marker.latitude < 58.644467))
        } else if (locationFilter === 'west') {
            setFilteredBuns(buns.filter(location => location.marker.longitude < 7.495750 && location.marker.latitude > 58.644467))
        } else if (locationFilter === 'east') {
            setFilteredBuns(buns.filter(location => location.marker.longitude > 7.495750 && location.marker.latitude > 58.644467 && location.marker.latitude < 62.647063))
        } else if (locationFilter === 'mid') {
            setFilteredBuns(buns.filter(location => location.marker.latitude > 62.647063 && location.marker.latitude < 64.968975))
        } else if (locationFilter === 'north') {
            setFilteredBuns(buns.filter(location => location.marker.latitude > 64.968975))
        } else if (locationFilter === "all") {
            setFilteredBuns(buns)
        }
        setBunFilter('rank')
    }, [locationFilter]);
    return filteredBuns && <section>
        <fieldset className='flex justify-center pb-10 gap-2'>
            <AmberButton onClick={() => setLocationFilter('all')} highlighted={locationFilter === 'all'}>Alle</AmberButton>
            <AmberButton onClick={() => setLocationFilter('west')} highlighted={locationFilter === 'west'}>Vest</AmberButton>
            <AmberButton onClick={() => setLocationFilter('south')} highlighted={locationFilter === 'south'}>Sør</AmberButton>
            <AmberButton onClick={() => setLocationFilter('east')} highlighted={locationFilter === 'east'}>Øst</AmberButton>
            <AmberButton onClick={() => setLocationFilter('mid')} highlighted={locationFilter === 'mid'}>Midt</AmberButton>
            <AmberButton onClick={() => setLocationFilter('north')} highlighted={locationFilter === 'north'}>Nord</AmberButton>
        </fieldset>
        <MapContainer
            zoom={6}
            center={norway}
            scrollWheelZoom={false}
            className='h-dvh rounded-lg'
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredBuns?.map(whereThereIsBuns => {
                    const markerGradient = Math.floor(whereThereIsBuns.rating) / 5 * 100
                    let markerClass;
                    if (markerGradient === 100) {
                        markerClass = ""
                    } else if (markerGradient <= 80) {
                        markerClass = "grayscale-[30%]"
                    } else if (markerGradient <= 60) {
                        markerClass = "grayscale-[50%]"
                    } else if (markerGradient <= 20) {
                        markerClass = "grayscale-[80%]"
                    }
                    return <Marker
                        key={whereThereIsBuns.name}
                        icon={icon({iconUrl: '/bun-logo.webp', iconSize: point(20, 20), className: markerClass})}
                        position={latLng(whereThereIsBuns.marker.latitude, whereThereIsBuns.marker.longitude)}
                    >
                        <Popup className='w-80'>
                            <p className='pb-2'>
                                <img className='rounded-xl' src={whereThereIsBuns.pictures?.[0] ?? '/boller-placeholder.png'} alt={`bilde av ${whereThereIsBuns.name}`}/>
                            </p>
                            <p>
                                <span className='text-lg'>
                                    👉
                                    <button
                                        className='pl-1'
                                        onClick={() => {
                                            scrollTo(whereThereIsBuns.name);
                                            navigate(`#${whereThereIsBuns.id}`)
                                        }}>
                                        {whereThereIsBuns.name}
                                    </button>
                                </span>
                            </p>
                            <p className='pb-2'>
                                {[...Array(Math.floor(whereThereIsBuns.rating)).keys()].map(rating => <span key={`r-${rating}`}>⭐️</span>)}
                            </p>
                            <p>
                                {whereThereIsBuns.servings.map(serving =>
                                    <span key={serving} className='mr-1 items-center gap-2 rounded-s-sm py-2 px-2 bg-yellow-shmellow'>{serving}</span>
                                )}
                            </p>
                        </Popup>
                    </Marker>;
                }
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
    </section>
}

const BunInformation = () => {
    const {buns} = useContext(BunsContext)
    return <section className='bg-yellow-shmellow-dark py-52 justify-center flex items-center'>
        <div className='w-1/2'>
            <h2 className='text-center text-7xl font-thin'>Noen™ har bidratt med stoppesteder, mao. er det <p
                className='underline text-8xl font-bold'>{buns.length} lokasjoner</p> med mulighet for bakst langs veien
            </h2>
        </div>
    </section>
}

const TheBunsPage = () =>
    <>
        <BunInformation/>
        <div className='p-20 bg-yellow-shmellow'>
            <MapOBuns/>
            <AllTheBunLocations/>
        </div>
        <RegisterNewBunsInformation/>
    </>

export default TheBunsPage
