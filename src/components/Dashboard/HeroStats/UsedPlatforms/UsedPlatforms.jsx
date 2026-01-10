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
            <h3>Unique Platforms</h3>
            <p>{data.unique_platforms}</p>
        </div>
    )
}

export default UsedPlatforms