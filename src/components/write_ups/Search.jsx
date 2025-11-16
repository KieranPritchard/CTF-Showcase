function Search({ value, handleChange }) {
    return (
        <form>
            <input
                className="text-body border-4 h-12 border-[#00FF88] text-[#00FF88] rounded-xl p-2 w-72"
                type="text"
                value={value}               // controlled by parent
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search"
            />
        </form>
    );
}

export default Search;
