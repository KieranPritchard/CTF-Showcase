// Wrapper for dashboard stat cards and charts (theme border and background)
function StatsContainer({ children }) {
    return (
        <div className="flex justify-center bg-[#121A22] border-l-4 border-[#00FF88] p-4 text-center rounded-r-lg">
            {children}
        </div>
    );
}

export default StatsContainer