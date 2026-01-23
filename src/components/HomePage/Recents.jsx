import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import RecentWriteUp from "./RecentWriteUp";

function Recents() {
    const [writeups, setWriteups] = useState([]); // State to hold the write ups
    const cardsRef = useRef([]); // Hold refs for each card

    // Use effect to fetch the data
    useEffect(() => {
        // Fetches the data from the repository
        fetch("https://kieranpritchard.github.io/CTF-Showcase/writeups.json")
        // Converts the repsonse to json
        .then((res) => res.json())
        // Takes the data and sorts it
        .then((data) => {
            // Sorts the data from the reponse
            const sorted = [...data].sort((a, b) => {
                const da = a.created_date ? new Date(a.created_date) : 0;
                const db = b.created_date ? new Date(b.created_date) : 0;
                return db - da;
            });
            // Sets the sorte data in the state
            setWriteups(sorted.slice(0, 3));
        })
        // Catches the error
        .catch((err) => console.error("Failed to load writeups.json", err));
    }, []); // Runs once on mount

    // Intersection Observer
    useEffect(() => {
        // Creates new observer
        const observer = new IntersectionObserver(
            // Loops over the different entries
            (entries) => {
                // Loops over each of the entrys
                entries.forEach((entry) => {
                    // Checks if the entry is intersecting
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target); // Only animate once
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the card is visible
        );
        // Refrences each of the cards
        cardsRef.current.forEach((card) => {
            // Chechs if the card is observed
            if (card) observer.observe(card);
        });

        // disconnects the observer
        return () => observer.disconnect();
    }, [writeups]); // Changes on change to write ups 

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
                    to={`/write-ups/${w.slug}`}
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