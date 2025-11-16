import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecentWriteUp from "./RecentWriteUp";

function Recents() {
    const [writeups, setWriteups] = useState([]);

    useEffect(() => {
        fetch("/writeups.json")
            .then((res) => res.json())
            .then((data) => {
                const latest = data.slice(-3).reverse();
                setWriteups(latest);
            })
            .catch((err) => console.error("Failed to load writeups.json", err));
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col px-4 sm:px-8 py-10">
            {/* Header pinned at the top */}
            <h2 className="headings flicker text-4xl text-center font-bold mb-10 text-white">
                Recent Projects
            </h2>

            {/* Cards container: flex-grow + center vertically */}
            <div className="flex-1 flex items-center justify-center w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full justify-items-center items-stretch">
                    {writeups.map((w, idx) => {
                        const descriptionBlock = w.content?.find(b => b.type === "paragraph");
                        const description = descriptionBlock
                            ? descriptionBlock.text.slice(0, 200) + (descriptionBlock.text.length > 200 ? "..." : "")
                            : "No description available.";

                        return (
                            <Link
                                key={idx}
                                to={`/writeups/${w.slug}`}
                                className="h-full w-full flex justify-center hover:scale-[1.02] transition-transform"
                            >
                                <RecentWriteUp
                                    title={w.title}
                                    description={description}
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