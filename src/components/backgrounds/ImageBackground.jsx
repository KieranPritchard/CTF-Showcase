// This is a background that returns an image
function ImageBackground({ children, isEven, image }) {
    return (
        <div
            className={
                `${isEven ? "h-auto px-4 bg-[#121A22]" : "h-auto px-4 bg-[#0A0F14]"} 
                 bg-cover bg-center w-screen`
            }
            style={{
                backgroundImage: image ? `url(${image})` : "none",
                backgroundSize: "contain",
            }}
        >
            {children}
        </div>
    );
}

export default ImageBackground;