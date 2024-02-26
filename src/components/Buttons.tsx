import React, {ReactNode} from "react";
import {clsx} from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    highlighted?: boolean
    children: ReactNode
}

export const AmberButton = ({highlighted = false, children, ...rest}: ButtonProps) =>
    <button
        className={
            clsx(
                'hover:bg-amber-500 text-amber-600 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded',
                {'bg-transparent': !highlighted},
                {'border-transparent bg-amber-500 text-white': highlighted}
            )
        }
        {...rest}
    >
        {children}
    </button>