import {Link, useLocation} from "react-router-dom";

const applicationName = 'Bakst_'

const Header = () => {
    const {pathname} = useLocation()
    if (pathname !== "/") {
        return <header className='relative overflow-auto w-full py-10 px-10'>
            <div className='float-left'>
                <h1 className="text-3xl font-extralight"><Link to='/'>{applicationName}</Link></h1>
            </div>
            <div className='float-right'>
                <img className='w-10 inline-block' src='/bun-logo.webp' alt='en vakker bolle'/>
            </div>
        </header>
    } else {
        return <>
            <header className='grid grid-rows-1 grid-flow-col gap-4 md:min-h-screen dark:bg-ink-050 pb-8 md:pb-0 items-center '>
                <div className='justify-center items-center'>
                    <h1 className="lg:text-9xl font-extralight"><Link to='/'>{applicationName}</Link></h1>
                </div>
                <div className='items-center'>
                    <p className='pt-9 min-w-96'>En samling over stoppesteder som er &laquo;ved kjøreturen&raquo; for bakeverk rundt om kring i Noreg 🇳🇴</p>
                    <p className='pt-2'>
                        Av og for nytere av bakeverk
                        <img className='ml-2 w-6 inline-block' src='/bun-logo.webp' alt='en vakker bolle'/>
                    </p>
                </div>
            </header>
        </>;
    }
}

export default Header
