import { useEffect, useState } from "react"

// Displays unique platforms stat from hero stats
function UsedPlatforms() {
    // State to hold the hero stats data
    const [data, setData] = useState(null)

    // Use effect to fetch stats on mount
    useEffect(() => {
        // Fetches the stats from the json file
        fetch("/CTF-Showcase/stats.json")
            // Converts the response to json
            .then((r) => r.json())
            // Sets the hero object in state
            .then((json) => setData(json.hero))
            // Catches the error
            .catch((err) => console.error(err));
    }, []);

    // If data hasnt arrived yet, show loading instead of crashing
    if (!data) {
        return <p>Loading stats...</p>
    }

    return (
        <div>
            <h3 className="text-xl mb-2 font-bold text-[#00FF88]">Unique Platforms</h3>
            <p className="text-6xl font-semibold text-[#C7FCEC]">{data.unique_platforms}</p>
        </div>
    );
}

export default UsedPlatforms