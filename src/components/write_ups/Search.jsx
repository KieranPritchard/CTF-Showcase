import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search({ value, handleChange }) {

    const onSubmit = (e) => {
        e.preventDefault();
        handleChange(value, true); // run search
    };

    return (
        <form onSubmit={onSubmit} className="relative w-72">
            {/* Input */}
            <input
                className="text-body border-4 h-12 border-[#00FF88] text-[#00FF88] rounded-xl p-2 w-full pr-12"
                type="text"
                value={value}
                onChange={(e) => handleChange(e.target.value, false)} // just update text
                placeholder="Search"
            />

            {/* Font Awesome search icon */}
            <button
                type="submit"
                aria-label="search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00FF88] hover:scale-90 transition"
            >
                <FontAwesomeIcon icon={faSearch} size="lg" />
            </button>
        </form>
    );
}

export default Search;