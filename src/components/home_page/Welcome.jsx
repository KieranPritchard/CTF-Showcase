import { useEffect, useRef } from "react";

function Welcome() {
    const bannerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // animate only once
                }
                });
            },
            { threshold: 0.1 } // trigger when 10% visible
        );

        if (bannerRef.current) {
            observer.observe(bannerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
        ref={bannerRef}
        className="fade-in-bottom bg-[#121A22] border-2 border-[#00FF88] w-full max-w-3xl mx-auto py-4 px-4 sm:px-8 mb-15 rounded-lg shadow-[0_0_20px_#00FF88,0_0_40px_#00FF88,0_0_60px_#00FF88]"
        >
            <h1 className="headings flicker text-3xl sm:text-3xl md:text-4xl font-extrabold text-center my-4 text-[#C7FCEC] drop-shadow-[0_0_6px_#00FF88] tracking-wide">
                Explore My Write-Up's
            </h1>

            <p className="text-base sm:text-lg md:text-lg text-center px-2 sm:px-5 text-[#C7FCEC] leading-relaxed">
                Here you will find my CTF (Capture The Flag) challenge write-ups.
                The aim of this website is to take the presentation of my documents beyond a basic GitHub page.
                I accomplished this by designing and building this website myself to help set me apart, at least this will make me memorable.
            </p>
        </div>
    );
}

export default Welcome;