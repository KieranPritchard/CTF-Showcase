import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    // State to switch between open adn closed state
    const [open, setOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b bg-[#121a22] relative transition-all">
            <NavLink 
                className="headings text-[#00FF88] font-bold text-xl neon-hover"
                to="/"
            >
                Kieran Pritchard
            </NavLink>

            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/" className={({ isActive }) => `text-body neon-hover transition-all ${isActive ? "text-[#C7FCEC] flicker" : "text-[#C7FCEC]"}`}>Home</NavLink>
                <NavLink to="/write-ups" className={({ isActive }) => `text-body neon-hover transition-all ${isActive ? "text-[#C7FCEC] flicker" : "text-[#C7FCEC]"}`}>Write-Ups</NavLink>
                <NavLink to="/dashboard" className={({ isActive }) => `text-body neon-hover transition-all ${isActive ? "text-[#C7FCEC] flicker" : "text-[#C7FCEC]"}`}>Dashboard</NavLink>
                <NavLink to="/contact" className={({ isActive }) => `text-body neon-hover transition-all ${isActive ? "text-[#C7FCEC] flicker" : "text-[#C7FCEC]"}`}>Contact</NavLink>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="menu"
                className="sm:hidden text-[#C7FCEC]"
            >
                {/* Toggle Between Hamburger & X */}
                {open ? (
                    // X Icon
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="#00FF88" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.3 5.71L12 12.01L5.7 5.71L4.29 7.12L10.59 13.42L4.29 19.71L5.7 21.12L12 14.83L18.29 21.12L19.7 19.71L13.41 13.42L19.71 7.12L18.3 5.71Z" />
                    </svg>
                ) : (
                    // Hamburger Icon
                    <svg width="21" height="15" viewBox="0 0 50 50" fill="#00FF88" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 9H50V11H0V9ZM0 24H50V26H0V24ZM0 39H50V41H0V39Z" />
                    </svg>
                )}
            </button>

            {/* Mobile Dropdown */}
            <div
                className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full bg-[#121a22] z-50 shadow-lg-[#121a22] shadow-lg py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
            >
                <NavLink to="/" className="text-body block p-2 w-full hover:bg-[#27323C] rounded-md neon-hover text-[#C7FCEC]" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to="/write-ups" className="text-body block p-2 w-full hover:bg-[#27323C] rounded-md neon-hover text-[#C7FCEC]" onClick={() => setOpen(false)}>Write-Ups</NavLink>
                <NavLink to="/dashboard" className="text-body block p-2 w-full hover:bg-[#27323C] rounded-md neon-hover text-[#C7FCEC]" onClick={() => setOpen(false)}>Dashboard</NavLink>
                <NavLink to="/contact" className="text-body block p-2 w-full hover:bg-[#27323C] rounded-md neon-hover text-[#C7FCEC]" onClick={() => setOpen(false)}>Contact</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;