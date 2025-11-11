import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import matter from "gray-matter"
import Background from "../components/Background"
import Dropdown from "../components/write_ups/Dropdown"
import Search from "../components/write_ups/Search"
import Toolbar from "../components/write_ups/Toolbar"

const REPO_OWNER = "KieranPritchard"
const REPO_NAME = "CTF-Write-Ups"
const WRITEUPS_PATH = "writeups" // adjust if needed
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

    useEffect(() => {
        fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${WRITEUPS_PATH}`)
        .then((res) => res.json())
        .then(async (files) => {
        const mdFiles = files.filter((f) => f.name.endsWith(".md"))

        const fetched = await Promise.all(
            mdFiles.map(async (file) => {
                const raw = await fetch(file.download_url).then((r) => r.text())
                const { data, content } = matter(raw)
                    return {
                        slug: file.name.replace(".md", ""),
                        ...data,
                        contentExcerpt: content.slice(0, 150),
                }
            })
        )

            setPosts(fetched)
            setFiltered(fetched)
            setCategories([...new Set(fetched.map((p) => p.category).filter(Boolean))])
            setPlatforms([...new Set(fetched.map((p) => p.platform).filter(Boolean))])
        })
    }, [])

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

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
    const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    return (
    <Background>
        <Toolbar>
            <Search handleChange={setSearch} />
            <Dropdown options={categories} handleSelect={setCategory} message="Category" />
            <Dropdown options={platforms} handleSelect={setPlatform} message="Platform" />
        </Toolbar>

        <div className="grid gap-4 p-6">
            {shown.map((post) => (
                <Link
                    key={post.slug}
                    to={`/writeups/${post.slug}`}
                    className="block p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                    <h2 className="text-xl font-bold">{post.title || post.slug}</h2>
                    {post.date && <p className="text-sm text-gray-500">{post.date}</p>}
                    <p className="text-gray-700">{post.contentExcerpt}...</p>
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
                <span>Page {page} of {totalPages}</span>
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