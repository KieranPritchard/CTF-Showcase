import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import RecentWriteUp from "./RecentWriteUp";

function Recents() {
    const [writeups, setWriteups] = useState([]);
    const cardsRef = useRef([]); // Hold refs for each card

    useEffect(() => {
        fetch("https://kieranpritchard.github.io/CTF-Showcase/writeups.json")
        .then((res) => res.json())
        .then((data) => {
            const sorted = [...data].sort((a, b) => {
            const da = a.created_date ? new Date(a.created_date) : 0;
            const db = b.created_date ? new Date(b.created_date) : 0;
            return db - da;
            });
            setWriteups(sorted.slice(0, 3));
        })
        .catch((err) => console.error("Failed to load writeups.json", err));
    }, []);

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Only animate once
            }
            });
        },
        { threshold: 0.1 } // Trigger when 10% of the card is visible
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, [writeups]);

    return (
        <div className="min-h-screen w-full flex flex-col px-4 sm:px-8 py-10">
        <h2 className="headings flicker text-4xl text-center font-bold mb-10 text-white">
            Recent Write Up's
        </h2>

        <div className="flex-1 flex items-center justify-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full justify-items-center items-stretch">
            {writeups.map((w, idx) => {
                const descriptionBlock = w.content?.find(
                (b) => b.type === "paragraph"
                );
                const description = descriptionBlock
                ? descriptionBlock.text.slice(0, 200) +
                    (descriptionBlock.text.length > 200 ? "..." : "")
                : "No description available.";

                return (
                <Link
                    key={idx}
                    to={`/writeups/${w.slug}`}
                    ref={(el) => (cardsRef.current[idx] = el)}
                    className="fade-in-bottom h-full w-full flex justify-center hover:scale-[1.02] transition-transform"
                >
                    <RecentWriteUp
                    title={w.title}
                    description={description}
                    category={w.category}
                    />
                </Link>
                );
            })}
            </div>
        </div>
        </div>
    );
}

export default Recents;