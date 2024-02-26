import {ReactNode, useContext, useEffect, useState} from "react";
import {BunsContext} from "../context/Contexts.ts";
import {useNavigate, useParams} from "react-router-dom";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import {icon, latLng, point} from "leaflet";
import {HouseWithBunsId} from "../types/Buns.ts";
import {AnchorSimple} from "../components/Text.tsx";
import {asGoogleMapsDirectionsURL} from "../utilities/Buntilities.ts";

interface InformationSectionProps {
    title: string | ReactNode
    children: ReactNode
}

const SelectedBunSection = ({title, children}: InformationSectionProps) => {
    return <div className='py-6'>
        <hr className='pb-6'/>
        <p className="font-bold text-2xl">
            {title}
        </p>
        <p className="text-gray-700 text-base mt-2">
            {children}
        </p>
    </div>
}

const SelectedBunLocationPage = () => {
    const navigate = useNavigate()
    const {buns} = useContext(BunsContext)
    const [bunLocation, setBunLocation] = useState<HouseWithBunsId>()
    const {locationWithBuns} = useParams() as { locationWithBuns: string }
    const existingBunLocation = buns.find(bun => bun.id === +locationWithBuns)
    useEffect(() => {
        if (!existingBunLocation) {
            navigate("/")
        } else {
            setBunLocation(existingBunLocation)
        }
    }, []);
    return bunLocation && <>
        <div className='pb-20'>
            <div className='flex gap-0.5'>
                <img className='xl:w-1/3 lg:w-1/2 w-full' src={bunLocation.pictures?.[0] ?? '/boller-placeholder.png'} alt={`bilde av ${bunLocation.name}`}/>
                <img className='xl:w-1/3 lg:w-1/2 sm:w-full' src={bunLocation.pictures?.[0] ?? '/boller-placeholder.png'} alt={`bilde av ${bunLocation.name}`}/>
                <img className='xl:w-1/3 lg:w-1/2 sm:w-full' src={bunLocation.pictures?.[0] ?? '/boller-placeholder.png'} alt={`bilde av ${bunLocation.name}`}/>
            </div>
            <div className='pt-6 mx-auto max-w-[1140px] px-4'>
                <div>
                    <div className="font-bold text-5xl">
                        {bunLocation.name}
                    </div>
                    <span aria-hidden="true" className="flex gap-2 py-3 text-base sm:text-lg">
                            {[...Array(Math.floor(bunLocation.rating)).keys()].map(rating => <span key={`r-${rating}`}>⭐️</span>)}
                        </span>
                    <p className='text-gray-700 text-sm mt-2'>
                        {bunLocation.city ?? 'Ukjent'}, Norge
                    </p>
                </div>
                <SelectedBunSection title='Tilbys'>
                    <ul>
                        {bunLocation.servings.map(serving =>
                            <li key={serving} className=''>{serving}</li>
                        )}
                    </ul>
                </SelectedBunSection>
                <SelectedBunSection title='Fasiliteter'>
                    <ul>
                        {bunLocation.features.map(feature =>
                            <li key={feature} className=''>{feature}</li>
                        )}
                    </ul>
                </SelectedBunSection>
                <SelectedBunSection title='Litt om bollestedet'>
                    {bunLocation.description}
                </SelectedBunSection>
                <SelectedBunSection title='Bidragsyter'>
                    <span>{bunLocation.by}</span>, <span>{bunLocation.added.toLocaleDateString()}</span>.
                </SelectedBunSection>
                <SelectedBunSection title='Lokasjon'>
                    <MapContainer
                        zoom={9}
                        center={latLng(bunLocation.marker.latitude, bunLocation.marker.longitude)}
                        scrollWheelZoom
                        className='h-[600px] rounded-lg'
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            icon={icon({iconUrl: '/bun-logo.webp', iconSize: point(30, 30)})}
                            position={latLng(bunLocation.marker.latitude, bunLocation.marker.longitude)}
                            title={bunLocation.name}
                            interactive={false}
                        />
                    </MapContainer>
                </SelectedBunSection>
                <SelectedBunSection title='Diverse'>
                    <p>
                        <AnchorSimple href={bunLocation.www} target='_blank'>Gå til {bunLocation.name} på internettet</AnchorSimple>
                    </p>
                    <p>
                        <AnchorSimple href={asGoogleMapsDirectionsURL(bunLocation)} target='_blank'>Gå til veibeskrivelse</AnchorSimple>
                    </p>
                </SelectedBunSection>
            </div>
        </div>
    </>

}

export default SelectedBunLocationPage
