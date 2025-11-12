import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Background from "../components/Background"
import Dropdown from "../components/write_ups/Dropdown"
import Search from "../components/write_ups/Search"
import Toolbar from "../components/write_ups/Toolbar"

const PAGE_SIZE = 10

function WriteUps() {
    const [posts, setPosts] = useState([])
    const [filtered, setFiltered] = useState([])
    const [categories, setCategories] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [category, setCategory] = useState("")
    const [platform, setPlatform] = useState("")
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

  // ✅ Fetch from local JSON file (no CORS issues)
    useEffect(() => {
        fetch("/writeups.json")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data)
                setFiltered(data)

            // Extract unique categories and platforms for dropdowns
            setCategories([...new Set(data.map((p) => p.category).filter(Boolean))])
            setPlatforms([...new Set(data.map((p) => p.platform).filter(Boolean))])
        })
        .catch((err) => console.error("Failed to load writeups.json:", err))
    }, [])

    // ✅ Handle filtering and searching
    useEffect(() => {
        let results = posts
        if (category) results = results.filter((p) => p.category === category)
        if (platform) results = results.filter((p) => p.platform === platform)
        if (search)
            results = results.filter((p) =>
            (p.title || p.slug).toLowerCase().includes(search.toLowerCase())
        )

        setFiltered(results)
        setPage(1)
    }, [category, platform, search, posts])

    // ✅ Pagination
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
    const startIndex = (page - 1) * PAGE_SIZE
    const currentPosts = filtered.slice(startIndex, startIndex + PAGE_SIZE)

    return (
        <Background>
            <Toolbar>
                <Search handleChange={setSearch} />
                <Dropdown options={categories} handleSelect={setCategory} message="Category" />
                <Dropdown options={platforms} handleSelect={setPlatform} message="Platform" />
            </Toolbar>

        <div className="grid gap-4 p-6">
            {currentPosts.map((post) => (
            <Link
                key={post.slug}
                to={`/writeups/${post.slug}`}
                className="block p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
                <h2 className="text-xl font-bold">{post.title}</h2>
                {post.points && (
                    <p className="text-sm text-gray-500">
                        {post.category} · {post.platform} · {post.difficulty} ({post.points} pts)
                    </p>
                )}
                <p className="text-gray-700 mt-2 line-clamp-2">{post.description}</p>
            </Link>
            ))}
        </div>

        {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 py-6">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        )}
        </Background>
    )
}

export default WriteUps