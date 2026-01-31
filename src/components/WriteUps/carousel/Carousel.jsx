import { useState, useRef, useEffect } from "react";

// Carousel for write-up images (swipe on touch, prev/next buttons)
export default function Carousel({ images = [] }) {
    // State to hold valid images and current index
    const [validImages, setValidImages] = useState(images);
    const [currentImage, setCurrentImage] = useState(0);

    // Ref to track touch start position
    const startX = useRef(null);

    // Use effect to sync with updated props
    useEffect(() => {
        // Sets the valid images and resets to first image
        setValidImages(images || []);
        setCurrentImage(0);
    }, [images]);

    // Handle touch start (stores start position)
    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
    };

    // Handle touch end (swipe left/right to change image)
    const handleTouchEnd = (e) => {
        if (startX.current === null) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX.current - endX;
        const threshold = 50;

        // Checks swipe direction and moves image
        if (diff > threshold) nextImage();
        else if (diff < -threshold) prevImage();

        startX.current = null;
    };

    // Go to next image in the list
    const nextImage = () => {
        setCurrentImage((prev) =>
            validImages.length > 1 ? (prev + 1) % validImages.length : 0
        );
    };

    // Go to previous image in the list
    const prevImage = () => {
        setCurrentImage((prev) =>
            validImages.length > 1
                ? (prev - 1 + validImages.length) % validImages.length
                : 0
        );
    };

    // Remove invalid or broken image from the list
    const handleImageError = (index) => {
        setValidImages((prev) => {
            const updated = prev.filter((_, i) => i !== index);

            // Fix: prevent pointing to invalid index
            if (currentImage >= updated.length) {
                setCurrentImage(0);
            }

            return updated;
        });
    };

    // Returns null if there are no images
    if (!validImages.length) return null;

    return (
        <div className="w-full flex flex-col items-center my-10 px-[5%]">
            <div
                className="relative w-full max-w-3xl select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    src={validImages[currentImage].download_url}
                    alt={`Image ${currentImage + 1}`}
                    onError={() => handleImageError(currentImage)}
                    className="rounded-xl border border-[#00FF88] shadow-lg max-h-[500px] mx-auto object-contain bg-black/40"
                />

                {/* Previous image button */}
                <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-0 -translate-y-1/2 bg-black/60 text-[#00FF88] px-4 py-2 rounded-r-lg hover:bg-black/80"
                >
                    ‹
                </button>

                {/* Next image button */}
                <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-0 -translate-y-1/2 bg-black/60 text-[#00FF88] px-4 py-2 rounded-l-lg hover:bg-black/80"
                >
                    ›
                </button>
            </div>

            {/* Dot indicators for current image */}
            <div className="flex gap-2 mt-4">
                {validImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`h-3 w-3 rounded-full transition-all ${
                            currentImage === i
                                ? "bg-[#00FF88] scale-125"
                                : "bg-gray-500 opacity-70"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}