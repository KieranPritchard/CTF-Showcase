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
        const url = `https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/writeups/${slug}.md`
        fetch(url)
            .then((res) => res.text())
            .then((text) => {
                const { data, content } = matter(text)
                setMeta(data)
                const titleLine = content.match(/^# (.+)/)
                setHeader(titleLine ? titleLine[1] : data.title)
                setContent(content)
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
