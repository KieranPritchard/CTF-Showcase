import { useState } from "react";

function Dropdown({ options = [], handleSelect, message }) {
    // Controls whether the dropdown list is visible
    const [isOpen, setIsOpen] = useState(false);

    // Tracks which option is currently selected (defaults to provided message)
    const [selected, setSelected] = useState(message);

    // Handle clicking an option from the dropdown
    const onSelectOption = (option) => {
        setSelected(option);     // Update the visible text
        setIsOpen(false);        // Close the dropdown
        handleSelect(option);    // Send selected value up to the parent component
    };

    return (
        <div className="flex flex-col w-72 md:w-44 text-sm relative text-body">
            
            {/* Dropdown button — shows current selection */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}  // Toggle open/close
                className="w-full text-left px-4 py-2 h-12 pr-2 border-4 border-[#00FF88] text-[#00FF88] rounded-xl shadow-sm focus:outline-none"
            >
                <span>{selected}</span>

                {/* Arrow icon that rotates depending on dropdown state */}
                <svg
                    className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                        isOpen ? "rotate-0" : "-rotate-90"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#00FF88"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown list — only appears when isOpen is true */}
            {isOpen && (
                <ul className="w-full bg-[#0A0F14] border border-[#00FF88] text-[#00FF88] rounded shadow-md mt-1 py-2 absolute z-10">
                    {options.map((option) => (
                        <li
                            key={option}  // Unique key for React rendering
                            className="px-4 py-2 hover:bg-[#00FF88] hover:text-[#0A0F14] cursor-pointer"
                            onClick={() => onSelectOption(option)} // Select this option
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;