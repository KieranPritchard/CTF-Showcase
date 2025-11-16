import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b bg-[#121a22] relative transition-all">
            <NavLink className="headings text-[#00FF88] font-bold text-xl neon-hover">
                Kieran Pritchard
            </NavLink>

            {/* Desktop menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink
                to="/"
                className={({ isActive }) =>
                    `text-body neon-hover transition-all ${
                    isActive ? "text-[#C7FCEC]" : "text-[#C7FCEC]"
                    }`
                }
                >
                Home
                </NavLink>
                <NavLink
                to="/write-ups"
                className={({ isActive }) =>
                    `text-body neon-hover transition-all ${
                    isActive ? "text-[#C7FCEC]" : "text-[#C7FCEC]"
                    }`
                }
                >
                Write-Ups
                </NavLink>
                <NavLink
                to="/contact"
                className={({ isActive }) =>
                    `text-body neon-hover transition-all ${
                    isActive ? "text-[#C7FCEC]" : "text-[#C7FCEC]"
                    }`
                }
                >
                Contact
                </NavLink>
            </div>

            {/* Menu Button */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="menu"
                className="sm:hidden text-[#C7FCEC]"
            >
                <svg
                width="21"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="#00FF88"
                >
                <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
                </svg>
            </button>

            {/* Mobile menu */}
            <div
                className={`${
                open ? "flex" : "hidden"
                } absolute top-[60px] left-0 w-full bg-[#121a22] shadow-lg py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
            >
                <NavLink 
                    to="/" 
                    className="text-body block py-2 w-full neon-hover text-[#C7FCEC]"
                >
                    Home
                </NavLink>
                <NavLink
                    to="/write-ups"
                    className="text-body block py-2 w-full neon-hover text-[#C7FCEC]"
                >
                    Write-Ups
                </NavLink>
                <NavLink
                    to="/contact"
                    className="text-body block py-2 w-full neon-hover text-[#C7FCEC]"
                >
                    Contact
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;