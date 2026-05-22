'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Navbar = () => {
    const pathname = usePathname()

    const [scrolled, setScrolled] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);


    const toggleDropdown = () => {
        const newOpen = !dropdownOpen;
        setDropdownOpen(newOpen);
        if (newOpen) {
            setScrolled(true);
        } else {
           setTimeout(() => {
            setScrolled(window.scrollY > 50);
           }, 600); // matches dropdown's delay-100 + duration-300
        }
    }

    // Mount-only: seed scrolled from current position (refresh-mid-page case)
    useEffect(() => {
        setScrolled(window.scrollY > 50)
    }, [])

    // Ongoing scroll listener; closure picks up fresh dropdownOpen on each re-run
    useEffect(()=>{
        const handleScroll = ()=>{
            const offset = window.scrollY
            if (offset > 50 || dropdownOpen) {
                setScrolled(true)
            }else{
                setScrolled(false)
            }
        }

        window.addEventListener('scroll',handleScroll)
        return () => window.removeEventListener('scroll',handleScroll)
    },[dropdownOpen])

    useEffect(()=>{
        if(pathname !== '/' && pathname !== '/about' && pathname !== '/stays' && pathname !== '/contact'){
            setScrolled(true)
        }
    })

    // Close mobile dropdown on any route change
    useEffect(() => {
        setDropdownOpen(false)
        const t = setTimeout(() => {
            setScrolled(window.scrollY > 50)
        }, 600)
        return () => clearTimeout(t)
    }, [pathname])

  return (
    <div className={`relative`}>
        <div className={`flex justify-between items-center px-5 tny;px-6 sm:px-8 z-5 transition-colors duration-300 z-10 relative ${scrolled ? 'bg-cream-50 py-6 text-ink-700 shadow-xl': 'bg-transparent py-8 text-cream-100'} `}>
            <Link href={'/'} className="nav-logo-reveal">
                <h1 className='text-xl xsm:text-2xl tny:text-[26px] font-medium font-heading'>Haven Homes</h1>
            </Link>
            <div className="flex gap-6 text-l max-md:hidden nav-mid-reveal">
                <Link className='' href="/">Home</Link>
                <Link className='' href="/about">About </Link>
                <Link className='' href="/stays">Stays</Link>
                <Link className='' href="/contact">Contact</Link>
            </div>
            <button className="bg-emerald-700 max-md:hidden font-semibold rounded-md px-6 py-2.5 text-cream-200 font-medium hover:bg-cream-300 hover:border-cream-300 hover:text-ink-500 cursor-pointer transition-colors duration-300 nav-cta-reveal">
                <Link href='/'>Book Now</Link>
            </button>
            <div className="md:hidden nav-mid-reveal" onClick={toggleDropdown}>
                <button className='flex flex-col gap-[5px] vsm:gap-1.5'>
                    <span className={`w-7 vsm:w-8 h-[2.5px] rounded-full relative transition-all duration-200 ${scrolled ? 'bg-ink-700':'bg-cream-200'} ${dropdownOpen ? 'rotate-135 top-1':'rotate-0'}`}></span>
                    <span className={`w-7 vsm:w-8 h-[2.5px] rounded-full relative transition-all duration-200 ${scrolled ? 'bg-ink-700':'bg-cream-200'} ${dropdownOpen ? 'hidden' : 'block'}`}></span>
                    <span className={`w-7 vsm:w-8 h-[2.5px] rounded-full relative transition-all duration-200 ${scrolled ? 'bg-ink-700':'bg-cream-200'} ${dropdownOpen ? 'rotate-45 bottom-1':'rotate-0'}`}></span>
                </button>
                
            </div>
        </div>
        <div className={`absolute inset-0 md:hidden transition-all delay-100 duration-500 ${dropdownOpen ? 'top-19' :'-top-[100vh]'}`}>
            <div className="flex flex-col text-l h-[100vh] pt-3 bg-cream-50  text-ink-700 shadow rounded-b-2xl">
                <Link className='border-b-[0.5px] border-ink-300 py-5 px-6 sm:px-8' href="/">
                    Home
                </Link>
                <Link className='border-b-[0.5px] border-ink-300 py-5 px-6 sm:px-8' href="/about">
                    About 
                </Link>
                <Link className='border-b-[0.5px] border-ink-300 py-5 px-6 sm:px-8' href="/stays">
                    Stays
                </Link>
                <Link className='py-5 px-6 sm:px-8' href="/contact">
                    Contact
                </Link>

                <div className="px-5 sm:px-7 mt-8 w-full">
                    <button className="bg-emerald-700 w-full font-semibold rounded-md px-6 py-2.5 text-cream-200 font-medium hover:bg-cream-300 hover:border-cream-300 hover:text-ink-500 cursor-pointer transition-colors duration-300">
                        <Link href='/'>Book Now</Link>
                    </button>
                </div>
            </div>
             
        </div>

    </div>
  )
}

export default Navbar