import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import matter from "gray-matter"
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

    useEffect(() => {
        // Strategy: Handle nested folder structure (e.g., Contents/Agent_Sudo/file.md)
        // 1. Try manifest.json file (supports paths like "Agent_Sudo/file.md")
        // 2. Try recursively fetching from GitHub API via CORS proxy
        // 3. Try GitHub API directly (last resort)
        
        // Helper function to recursively fetch files from GitHub API
        const fetchFilesRecursively = async (apiPath = "Contents", proxyUrl = null) => {
            const apiUrl = `https://api.github.com/repos/KieranPritchard/CTF-Write-Ups/contents/${apiPath}`
            let url, parseResponse
            
            if (proxyUrl) {
                // allorigins.win wraps the response
                url = `${proxyUrl}?url=${encodeURIComponent(apiUrl)}`
                parseResponse = async (res) => {
                    const text = await res.text()
                    try {
                        // allorigins.win returns the data as text, need to parse it
                        return JSON.parse(text)
                    } catch (e) {
                        // If it's already parsed or wrapped, try to extract
                        const jsonMatch = text.match(/\{.*\}/s)
                        if (jsonMatch) {
                            return JSON.parse(jsonMatch[0])
                        }
                        throw new Error('Failed to parse response')
                    }
                }
            } else {
                url = apiUrl
                parseResponse = (res) => res.json()
            }
            
            try {
                const res = await fetch(url)
                if (!res.ok) {
                    console.warn(`Failed to fetch ${apiPath}: ${res.status}`)
                    return []
                }
                
                const data = await parseResponse(res)
                const items = Array.isArray(data) ? data : [data]
                const files = []
                
                for (const item of items) {
                    if (item.type === 'file' && item.name && item.name.endsWith('.md')) {
                        // Store relative path from Contents folder
                        const relativePath = apiPath === 'Contents' 
                            ? item.name 
                            : `${apiPath.replace('Contents/', '')}/${item.name}`
                        files.push({ path: relativePath, name: item.name })
                    } else if (item.type === 'dir' && item.name) {
                        // Recursively fetch from subdirectories
                        const subPath = apiPath === 'Contents' 
                            ? `Contents/${item.name}` 
                            : `${apiPath}/${item.name}`
                        const subFiles = await fetchFilesRecursively(subPath, proxyUrl)
                        files.push(...subFiles)
                    }
                }
                
                return files
            } catch (error) {
                console.error(`Error fetching ${apiPath}:`, error.message)
                return []
            }
        }
        
        const loadWriteUps = async () => {
            let fileList = []
            
            // Try 1: Fetch manifest.json from repo (supports nested paths)
            try {
                const manifestUrl = `https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/Contents/manifest.json`
                const manifestRes = await fetch(manifestUrl)
                if (manifestRes.ok) {
                    const manifest = await manifestRes.json()
                    if (Array.isArray(manifest.files)) {
                        // Manifest files can be strings (paths) or objects with path property
                        fileList = manifest.files.map(file => {
                            if (typeof file === 'string') {
                                return { path: file, name: file.split('/').pop() }
                            }
                            return { path: file.path || file.name, name: (file.path || file.name).split('/').pop() }
                        })
                        console.log(`Loaded ${fileList.length} files from manifest.json`)
                    }
                }
            } catch (error) {
                console.log("Manifest.json not found or error, trying alternative methods...")
            }
            
            // Try 2: If manifest doesn't exist, try allorigins.win CORS proxy with recursive fetching
            if (fileList.length === 0) {
                try {
                    const proxyUrl = `https://api.allorigins.win/raw`
                    fileList = await fetchFilesRecursively("Contents", proxyUrl)
                    if (fileList.length > 0) {
                        console.log(`Loaded ${fileList.length} files from GitHub API via allorigins.win (recursive)`)
                    }
                } catch (error) {
                    console.log("allorigins.win proxy failed, trying direct GitHub API...")
                }
            }
            
            // Try 3: Last resort - try GitHub API directly with recursive fetching
            if (fileList.length === 0) {
                try {
                    fileList = await fetchFilesRecursively("Contents")
                    if (fileList.length > 0) {
                        console.log(`Loaded ${fileList.length} files from GitHub API directly (recursive)`)
                    }
                } catch (error) {
                    console.error("All methods failed. Please create a manifest.json file in the Contents folder.")
                }
            }
            
            // If we still don't have files, show error but don't break the UI
            if (fileList.length === 0) {
                console.warn("No files found. Please create a manifest.json file in the Contents folder.")
                console.warn("Example: {\"files\": [\"Agent_Sudo/writeup.md\", \"Other_CTF/file.md\"]}")
                setPosts([])
                setFiltered([])
                return
            }
            
            // Fetch and process all markdown files
            const fetched = await Promise.all(
                fileList.map(async (file) => {
                    try {
                        const filePath = file.path || file.name
                        // Construct URL with full path
                        const rawUrl = `https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/Contents/${filePath}`
                        const raw = await fetch(rawUrl).then((r) => {
                            if (!r.ok) throw new Error(`Failed to fetch ${filePath}: ${r.status}`)
                            return r.text()
                        })
                        const { data, content } = matter(raw)
                        
                        // Create slug from path (replace slashes with dashes, remove .md)
                        // e.g., "Agent_Sudo/writeup.md" -> "Agent_Sudo-writeup"
                        const slug = filePath.replace(/\.md$/, '').replace(/\//g, '-')
                        
                        return {
                            slug,
                            filePath, // Store original path for fetching
                            ...data,
                            contentExcerpt: content.slice(0, 150),
                        }
                    } catch (error) {
                        console.error(`Error processing ${file.path || file.name}:`, error)
                        return null
                    }
                })
            )

            // Filter out any null values from failed fetches
            const validPosts = fetched.filter(Boolean)
            
            // Store filePath mapping in sessionStorage for WriteUpPage to use
            const filePathMap = {}
            validPosts.forEach(post => {
                filePathMap[post.slug] = post.filePath
            })
            try {
                sessionStorage.setItem('writeupFilePaths', JSON.stringify(filePathMap))
            } catch (e) {
                console.warn('Could not store file paths in sessionStorage:', e)
            }
            
            setPosts(validPosts)
            setFiltered(validPosts)
            setCategories([...new Set(validPosts.map((p) => p.category).filter(Boolean))])
            setPlatforms([...new Set(validPosts.map((p) => p.platform).filter(Boolean))])
        }
        
        loadWriteUps().catch((error) => {
            console.error("Error loading write-ups:", error)
            setPosts([])
            setFiltered([])
            setCategories([])
            setPlatforms([])
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