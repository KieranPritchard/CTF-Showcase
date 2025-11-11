import { useState } from "react"

function Dropdown({ options = [], handleSelect, message}) {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(message)

    const onSelectOption = (option) => {
        setSelected(option)
        setIsOpen(false)
        handleSelect(option) // ✅ send data up to parent
    }

    return (
        <div className="flex flex-col w-44 text-sm relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-4 pr-2 py-2 border rounded-xl shadow-sm focus:outline-none"
            >
                <span>{selected}</span>
                <svg
                    className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#6B7280"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <ul className="w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 absolute z-10">
                {options.map((option) => (
                    <li
                        key={option}
                        className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                        onClick={() => onSelectOption(option)}
                    >
                        {option}
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown