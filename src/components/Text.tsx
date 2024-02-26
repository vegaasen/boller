import {AnchorHTMLAttributes, ReactNode} from "react";

interface AnchorSimpleProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
    children: ReactNode
}

export const AnchorSimple = ({children, ...rest}: AnchorSimpleProps) => <a className='no-underline hover:underline' {...rest}>{children}</a>
