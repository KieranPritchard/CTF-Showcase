// This is a fixed size background
function Background({ children, isEven }) {
    return (
        // Wrapper switches background colour based on isEven (full screen height)
        <div className={isEven ? "h-screen bg-[#121A22] px-4" : "h-screen bg-[#0A0F14] px-4"}>
            {children}
        </div>
    );
}

export default Background