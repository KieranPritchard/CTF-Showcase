import { useEffect, useState } from "react"

function TotalPoints(){
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
            <h3>Total Challenges</h3>
            <p>{data.total_points}</p>
        </div>
    )
}

export default TotalPoints