import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import Background from "../components/Background"

function WriteUpPage() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/writeups.json")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((item) => item.slug === slug)
                setPost(found)
                setLoading(false)
            })
        .catch((err) => console.error("Failed to load writeup:", err))
    }, [slug])

    if (loading) return <p className="text-center mt-8">Loading...</p>
    if (!post) return <p className="text-center mt-8">Write-up not found.</p>

    return (
        <Background>
            <header className="bg-gray-100 py-10 text-center shadow">
                <h1 className="text-4xl font-bold">{post.title}</h1>
                <p className="text-gray-600 mt-2">
                {post.ctf_name} · {post.category} · {post.difficulty} ({post.points} pts)
                </p>
                {post.flag && (
                <p className="mt-4 text-green-600 font-mono">{post.flag}</p>
                )}
            </header>

            <article className="prose lg:prose-xl max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow mt-6">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        img: ({ node, ...props }) => (
                        <img className="rounded-xl shadow" {...props} />
                        ),
                    }}
                    >
                    {post.raw_markdown}
                </ReactMarkdown>
            </article>
        </Background>
    )
}

export default WriteUpPage
