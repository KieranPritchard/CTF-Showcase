import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Background from "../components/Background";

function WriteUpPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/writeups.json")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((item) => item.slug === slug);
                setPost(found);
                setLoading(false);
            })
        .catch((err) => console.error("Failed to load writeup:", err));
    }, [slug]);

    if (loading) return <p className="text-center mt-8">Loading...</p>;
    if (!post) return <p className="text-center mt-8">Write-up not found.</p>;

    // Function to render each block
    const renderBlock = (block, index) => {
        switch (block.type) {
        case "heading":
            const HeadingTag = `h${block.level}`;
            return <HeadingTag key={index}>{block.text}</HeadingTag>;

        case "paragraph":
            return <p key={index}>{block.text}</p>;

        case "list":
            const ListTag = block.ordered ? "ol" : "ul";
            return (
            <ListTag key={index} className="ml-6 list-disc">
                {block.items.map((item, i) => (
                <li key={i}>{item}</li>
                ))}
            </ListTag>
            );

        case "code":
            return (
            <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                <code className={`language-${block.language}`}>{block.code}</code>
            </pre>
            );

        case "image":
            return (
            <img
                key={index}
                src={block.src}
                alt={block.alt}
                className="rounded-xl shadow my-4"
            />
            );

        default:
            return null;
        }
    };

    return (
            <Background>
                <header className="bg-gray-100 py-10 text-center shadow">
                    <h1 className="text-4xl font-bold">{post.title}</h1>
                    <p className="text-gray-600 mt-2">
                    {post.ctf_name} · {post.category} · {post.difficulty} ({post.points} pts)
                    </p>
                    {post.flag && <p className="mt-4 text-green-600 font-mono">{post.flag}</p>}
                </header>

                <article className="prose lg:prose-xl max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow mt-6">
                    {post.content.map((block, idx) => renderBlock(block, idx))}
                </article>
            </Background>
        );
    }

export default WriteUpPage;