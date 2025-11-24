import { useEffect, useRef } from "react";
import ImageOfMe from "../../assets/kieran-pritchard-profile-photo.webp";

function About() {
    const imageRef = useRef(null);
    const textRef = useRef(null);

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

        if (imageRef.current) observer.observe(imageRef.current);
        if (textRef.current) observer.observe(textRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-10 w-full">
            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full max-w-6xl">
                
                {/* Image Section */}
                <div ref={imageRef} className="fade-in-left flex justify-center md:justify-start">
                    <img
                        src={ImageOfMe}
                        alt="Image of me"
                        className="w-full max-w-sm rounded-lg shadow-lg"
                    />
                </div>

                {/* Text Section */}
                <div ref={textRef} className="fade-in-right w-full md:w-auto text-center md:text-left">
                    <h2 className="headings flicker text-white text-3xl sm:text-4xl font-bold mb-4">About</h2>
                    <p className="text-body text-lg sm:text-xl text-[#C7FCEC] leading-relaxed">
                        I'm currently a T-Level student at Bournemouth and Poole College studying software development; however, despite focusing on that, I also love all things hacking and cyber security which honestly just shows how much of a geek I am.
                        You might be wondering why I'm studying software development in the first place. Well, it complements what I do really well by building up my coding knowledge, so I can not only build programs but also break them apart.
                        Also, If you are a hacker or have a knack for this sort of thing I would love to hear about any vulnerablilities you can find and also any secrets I've hidden.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default About;