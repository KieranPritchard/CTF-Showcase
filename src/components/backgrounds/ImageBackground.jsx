// This is a background that returns an image
function ImageBackground({ children, isEven, image }) {
    return (
        // Wrapper with background image (cover), switches bg colour based on isEven
        <div
            className={
                `${isEven ? "min-h-screen px-4 bg-[#121A22]" : "min-h-screen px-4 bg-[#0A0F14]"} bg-cover bg-center bg-no-repeat w-full`
            }
            style={{
                backgroundImage: image ? `url(${image})` : "none",
                backgroundSize: "cover",
            }}
        >
            {children}
        </div>
    );
}

export default ImageBackground;