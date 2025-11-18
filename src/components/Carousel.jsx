// src/components/Carousel.jsx
import { useState, useRef } from "react";

export default function Carousel({ images }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [validImages, setValidImages] = useState(images || []);

    const startX = useRef(null);
    const endX = useRef(null);

    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        endX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (startX.current === null || endX.current === null) return;

        const diff = startX.current - endX.current;
        const threshold = 50;

        if (diff > threshold) {
            setCurrentImage((prev) => getNextIndex(prev, validImages.length, "next"));
        } else if (diff < -threshold) {
            setCurrentImage((prev) => getNextIndex(prev, validImages.length, "prev"));
        }

        startX.current = null;
        endX.current = null;
    };

    // Navigate without selecting the same image again
    const getNextIndex = (current, length, direction = "next") => {
        if (length <= 1) return 0;
        let next;
        do {
            next =
                direction === "next"
                    ? (current + 1) % length
                    : (current - 1 + length) % length;
        } while (next === current);
        return next;
    };

    const handleImageError = (index) => {
        setValidImages((prev) => prev.filter((_, i) => i !== index));
        if (index === currentImage) setCurrentImage(0);
    };

    if (!validImages || validImages.length === 0) return null;

    return (
        <div className="w-full flex flex-col items-center my-10 px-[5%]">
            <div
                className="relative w-full max-w-3xl select-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    src={validImages[currentImage].download_url}
                    alt={`Image ${currentImage + 1}`}
                    onError={() => handleImageError(currentImage)}
                    className="rounded-xl border border-[#00FF88] shadow-lg max-h-[500px] mx-auto object-contain bg-black/40"
                />

                <button
                    onClick={() =>
                        setCurrentImage((prev) =>
                            getNextIndex(prev, validImages.length, "prev")
                        )
                    }
                    className="absolute top-1/2 left-0 -translate-y-1/2 bg-black/60 text-[#00FF88] px-4 py-2 rounded-r-lg hover:bg-black/80"
                >
                    ‹
                </button>

                <button
                    onClick={() =>
                        setCurrentImage((prev) =>
                            getNextIndex(prev, validImages.length, "next")
                        )
                    }
                    className="absolute top-1/2 right-0 -translate-y-1/2 bg-black/60 text-[#00FF88] px-4 py-2 rounded-l-lg hover:bg-black/80"
                >
                    ›
                </button>
            </div>

            <div className="flex gap-2 mt-4">
                {validImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`h-3 w-3 rounded-full ${
                            currentImage === i ? "bg-[#00FF88]" : "bg-gray-500"
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
}