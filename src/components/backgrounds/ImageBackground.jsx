// This is a background that returns an image
function ImageBackground({ children, isEven, image }) {
    return (
        <div
            className={
                `${isEven ? "h-screen px-4 bg-[#121A22]" : "h-screen px-4 bg-[#0A0F14]"} bg-cover bg-center bg-no-repeat`
            }
            style={{
                backgroundImage: image ? `url(${image})` : "none"
            }}
        >
            {children}
        </div>
    );
}

export default ImageBackground;
