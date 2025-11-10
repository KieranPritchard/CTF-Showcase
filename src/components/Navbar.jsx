import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar(){
    const [open, setOpen] = useState(false)
    return(
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink>
                Write-Up Database
            </NavLink>
            
            {/* Desktop menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/write-ups'}>Write-Ups</NavLink>
                <NavLink to={'/contact'}>Contact</NavLink>
            </div>

            {/* Menu Button */}
            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="menu" className="sm:hidden">
                <svg width="21" height="15"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">
                    <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
                </svg>
            </button>

            {/* Mobile menu */}
            <div className={`${open ? 'flex': 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to={'/'} className="block py-2 w-full">Home</NavLink>
                <NavLink to={'/write-ups'} className="block py-2 w-full">Write-Ups</NavLink>
                <NavLink to={'/contact'} className="block py-2 w-full">Contact</NavLink>
            </div>
        </nav>
    )
}

export default Navbar