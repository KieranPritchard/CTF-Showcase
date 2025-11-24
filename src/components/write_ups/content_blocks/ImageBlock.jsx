function ImageBlock({ index, block }) {
    return (
        <img
            // React key helps React identify this element if rendered in a list
            key={index}

            // Image source + optional alt text for accessibility
            src={block.src}
            alt={block.alt}

            // Visual styling for consistent appearance across write-ups
            className="rounded-xl shadow my-4 border border-[#00FF88]"

            // Prevents broken images from showing by hiding them if loading fails
            onError={(e) => (e.currentTarget.style.display = "none")}
        />
    );
}

export default ImageBlock;