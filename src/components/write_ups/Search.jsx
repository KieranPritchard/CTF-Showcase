import { useState } from "react"

function Search(){
    const [item, setItem] = useState("")

    const handleChange = (e) => {
        setItem(e.target.value)
    }

    return(
        <form>
            <input
                className="border rounded-xl p-2 w-75"
                type="text"
                value={item}
                onChange={handleChange}
                placeholder="Search"
            >
            </input>
        </form>
    )
}

export default Search