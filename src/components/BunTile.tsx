import {HouseWithBunsId} from "../types/Buns.ts";
import {ReactNode, useEffect, useState} from "react";
import {BunLocationByDistance} from "../utilities/Geolocation.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {capThatString} from "../utilities/Strings.ts";
import {clsx} from "clsx";

interface BunTilesProps {
    bunLocations: BunLocationByDistance[]
}

interface BunTileProps {
    bunLocation: HouseWithBunsId
    distanceFromBunLover: number
    children?: ReactNode
    highlightedTile: number
}

export const BunTiles = ({bunLocations}: BunTilesProps) => {
    const location = useLocation()
    if (!bunLocations || bunLocations.length === 0) {
        return <>Null og nix bakeverksplatzer 😢?</>
    }
    return <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-4'>
        {bunLocations.map(({bunLocation, distance}, index) =>
            <BunTile
                key={`${index}-${distance}`}
                bunLocation={bunLocation}
                distanceFromBunLover={distance}
                highlightedTile={+location.hash?.replace("#", "")}
            />
        )}
    </div>;
}

const BunTile = ({bunLocation, distanceFromBunLover, highlightedTile}: BunTileProps) => {
    const navigate = useNavigate()
    const [highlightedClass, setHighlighedClass] = useState<string>('')
    useEffect(() => {
        if (highlightedTile) {
            setHighlighedClass("grayscale")
            setTimeout(() => {
                setHighlighedClass("")
            }, 1200)
        }
    }, [highlightedTile]);
    return <div id={bunLocation.name}>
        <div
            onClick={() => navigate(`/b/${bunLocation.id}`)}
            title={`Se mer om ${bunLocation.name}`}
            className={clsx(
                "bg-white rounded overflow-hidden drop-shadow-md min-h-full cursor-pointer",
                highlightedTile === bunLocation.id ? highlightedClass : ''
            )
            }>
            <div>
                <div>
                    <span aria-hidden="true" className="px-3 py-1 absolute float-right rounded-full bg-white mt-2 ml-2">
                        {[...Array(Math.floor(bunLocation.rating)).keys()].map(rating => <span className='mr-1' key={`r-${rating}`}>⭐️</span>)}
                    </span>
                </div>
                <img className="w-full" src={bunLocation.pictures?.[0] ?? '/boller-placeholder.png'} alt={`Bollebilde relatert til ${bunLocation.name}`}/>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl">{bunLocation.name}</div>
                <p className="text-gray-700 text-base mt-2">
                    {capThatString(bunLocation.description)}
                </p>
                <p className='text-gray-700 text-sm mt-2'>
                    {bunLocation.city ?? 'Ukjent'}, Norge {distanceFromBunLover > 0 && distanceFromBunLover < 5000 ? `(${Math.ceil(distanceFromBunLover)} km unna)` : null}
                </p>
            </div>
        </div>
    </div>;
}
