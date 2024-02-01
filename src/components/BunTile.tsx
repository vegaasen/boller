import {HouseWithBuns} from "../types/Buns.ts";
import {ReactNode} from "react";
import {clsx} from "clsx";

interface BunTileProps {
    bunLocation: HouseWithBuns
    distanceFromBunLover: number
    oddOrEven?: 'odd' | 'even'
    children?: ReactNode
}

const BunTile = ({bunLocation, children = undefined, distanceFromBunLover, oddOrEven}: BunTileProps) =>
    <div className={
        clsx(
            "flex flex-col items-start gap-5 md:gap-28",
            {"md:flex-row-reverse": oddOrEven === "even"},
            {"md:flex-row": oddOrEven === "odd"}
        )
    }>
        <div className="relative w-full flex-1">
            <span aria-hidden="true" className="absolute flex items-center gap-2 rounded-br bg-white py-3 px-3 text-base sm:text-lg">
                {[...Array(bunLocation.rating).keys()].map(rating => <span key={`r-${rating}`}>⭐️</span>)}
            </span>
            <div className="featured_image rounded-full">
                <img src={bunLocation.pictures[0]} alt={`bilde av ${bunLocation.name}`}/>
            </div>
        </div>
        <div className="flex flex-1 flex-col">
            <div>
                <h3 className="text-[32px] font-medium leading-[40px] sm:text-4xl md:text-6xl md:leading-[52px]">
                    <a href={bunLocation.www}>{bunLocation.name}</a>
                </h3>
                <span>Lagt til {bunLocation.added.toLocaleDateString()} av {bunLocation.by}</span>
            </div>
            <p className="mt-6 text-[18px] md:text-xl">
                {bunLocation.description}
            </p>
            {children ? children : null}
            <p className='mt-6 '>
                {bunLocation.servings.map(serving =>
                    <span key={serving} className='mr-1 items-center gap-2 bg-white py-2 px-2 text-base'>{serving}</span>
                )}
            </p>
            <p className='mt-6 '>
                <span className='italic'>{distanceFromBunLover} km fra deg</span>
            </p>
        </div>
    </div>

export default BunTile