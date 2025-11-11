import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import matter from "gray-matter"
import Background from "../components/Background"

function WriteUpPage() {
    const { slug } = useParams()
    const [content, setContent] = useState("")
    const [meta, setMeta] = useState({})
    const [header, setHeader] = useState("")

    useEffect(() => {
        // Get filePath from sessionStorage (stored by WriteUps page)
        // If not found, try to reconstruct from slug (convert dashes to slashes)
        let filePath = null
        
        try {
            const filePathMap = sessionStorage.getItem('writeupFilePaths')
            if (filePathMap) {
                const map = JSON.parse(filePathMap)
                filePath = map[slug]
            }
        } catch (e) {
            console.warn('Could not read file paths from sessionStorage:', e)
        }
        
        // If filePath not found, try to construct it from slug
        // Slug format: "Agent_Sudo-writeup" -> "Agent_Sudo/writeup.md"
        if (!filePath) {
            // Try converting last dash to slash (most common case: folder-name)
            const lastDashIndex = slug.lastIndexOf('-')
            if (lastDashIndex > 0) {
                filePath = `${slug.substring(0, lastDashIndex)}/${slug.substring(lastDashIndex + 1)}.md`
            } else {
                // No dashes, assume it's a flat file
                filePath = `${slug}.md`
            }
        }
        
        // Construct URL with full path
        const url = `https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/Contents/${filePath}`
        
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    // If first attempt fails, try as flat file (fallback)
                    if (filePath.includes('/')) {
                        const fallbackUrl = `https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/Contents/${slug}.md`
                        return fetch(fallbackUrl).then(fallbackRes => {
                            if (!fallbackRes.ok) throw new Error(`Failed to fetch write-up: ${res.status}`)
                            return fallbackRes.text()
                        })
                    }
                    throw new Error(`Failed to fetch write-up: ${res.status}`)
                }
                return res.text()
            })
            .then((text) => {
                const { data, content } = matter(text)
                setMeta(data)
                const titleLine = content.match(/^# (.+)/)
                setHeader(titleLine ? titleLine[1] : data.title)
                setContent(content)
            })
            .catch((error) => {
                console.error("Error fetching write-up:", error)
                setContent("## Error\n\nFailed to load write-up. Please try again later.")
                setHeader("Error")
            })
    }, [slug])

    return (
        <Background>
            <header className="bg-gray-100 py-10 text-center shadow">
                <h1 className="text-4xl font-bold">{header}</h1>
                {meta.date && <p className="text-gray-500 mt-2">{meta.date}</p>}
            </header>

        <article className="prose lg:prose-xl max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow mt-6">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                        h1: () => null, // hide duplicate top header
                        img: ({ node, ...props }) => (
                        <img className="rounded-xl shadow" {...props} />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
        </Background>
    )
}

export default WriteUpPage
