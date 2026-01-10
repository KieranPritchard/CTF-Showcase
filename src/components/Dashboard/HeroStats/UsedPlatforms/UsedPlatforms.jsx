import { useEffect, useState } from "react"

function UsedPlatforms(){
    const [data, setData] = useState(null)

    useEffect(()=> {
        fetch("/CTF-Showcase/stats.json")
        .then((r) => r.json())
        .then((json) => setData(json.hero)) // Accessing the 'hero' object
        .catch((err) => console.error(err));
    }, [])
    
    // If data hasn't arrived yet, show this instead of crashing
    if (!data) {
        return <p>Loading stats...</p>
    }

    return(
        <div>
            <h3 className="text-xl mb-2 font-bold text-[#00FF88]">Unique Platforms</h3>
            <p className="text-6xl font-semibold text-[#C7FCEC]">{data.unique_platforms}</p>
        </div>
    )
}

export default UsedPlatforms