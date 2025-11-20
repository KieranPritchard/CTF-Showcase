import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecentWriteUp from "./RecentWriteUp";

function Recents() {
    const [writeups, setWriteups] = useState([]);

    useEffect(() => {
        fetch("https://kieranpritchard.github.io/CTF-Showcase/writeups.json")
            .then((res) => res.json())
            .then((data) => {
                // Sort by created_date (newest → oldest)
                const sorted = [...data].sort((a, b) => {
                    const da = a.created_date ? new Date(a.created_date) : 0;
                    const db = b.created_date ? new Date(b.created_date) : 0;
                    return db - da;
                });

                // Take the latest 3
                setWriteups(sorted.slice(0, 3));
            })
            .catch((err) => console.error("Failed to load writeups.json", err));
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col px-4 sm:px-8 py-10">
            <h2 className="headings flicker text-4xl text-center font-bold mb-10 text-white">
                Recent Write Up's
            </h2>

            <div className="flex-1 flex items-center justify-center w-full">
                {/* Displays three of my recent write ups */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full justify-items-center items-stretch">
                    {writeups.map((w, idx) => {
                        // Makes the description and limits it to under 200 characters 
                        const descriptionBlock = w.content?.find(b => b.type === "paragraph");
                        const description = descriptionBlock
                            ? descriptionBlock.text.slice(0, 200) +
                              (descriptionBlock.text.length > 200 ? "..." : "")
                            : "No description available.";

                        return (
                            // Links to the actual write up's
                            <Link
                                key={idx}
                                to={`/writeups/${w.slug}`}
                                className="h-full w-full flex justify-center hover:scale-[1.02] transition-transform"
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