import { useEffect, useState } from "react"

function TotalChallenges(){
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
            <h3 className="text-xl mb-2 font-bold text-[#00FF88]">Total Challenges</h3>
            <p className="text-6xl font-semibold text-[#C7FCEC]">{data.total_challenges}</p>
        </div>
    )
}

export default TotalChallenges