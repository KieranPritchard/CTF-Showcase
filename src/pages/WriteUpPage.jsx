import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AutoBackground from "../components/AutoBackground";
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

    // -----------------------------
    // Block renderer
    // -----------------------------
    const renderBlock = (block, index) => {
        switch (block.type) {

            case "heading":
                return (
                    <h1
                        key={index}
                        className={`text-[#00FF88] font-bold mt-6 mb-3 ${
                            block.level === 1 ? "text-3xl" :
                            block.level === 2 ? "text-xl" :
                            "text-xl"
                        }`}
                    >
                        {block.text}
                    </h1>
                );

            case "subheading":
                return (
                    <h3
                        key={index}
                        className="text-lg mt-5 mb-2 text-[#00FF88] font-semibold"
                    >
                        {block.text}
                    </h3>
                );

            case "paragraph":
                return (
                    <p key={index} className="px-5 my-3 text-[#C7FCEC] leading-relaxed">
                        {block.text}
                    </p>
                );

            case "list":
                return (
                    <ul key={index} className="px-5 ml-6 text-[#C7FCEC] list-disc my-3">
                        {block.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                );

            case "code":
                return (
                    <pre
                        key={index}
                        className="bg-black/40 text-[#00FF88] p-4 mx-5 rounded-lg overflow-x-auto my-4 border border-[#00FF88]"
                    >
                        <code>{block.code}</code>
                    </pre>
                );

            case "image":
                return (
                    <img
                        key={index}
                        src={block.src}
                        alt={block.alt}
                        className="rounded-xl shadow my-4 border border-[#00FF88]"
                    />
                );

            default:
                return null;
        }
    };

    // -----------------------------
    // Page layout
    // -----------------------------
    return (
        <div>
            <Background >
                <header className="flex flex-col justify-center px-[5%] h-full">
                    <div className="border h-2/5 mb-5 rounded-xl text-[#00FF88]">

                    </div>

                    <h1 className="text-4xl mb-5 font-bold text-[#00FF88]">
                        {post.title}
                    </h1>

                    <p className="flex flex-row gap-2 text-[#00FF88] my-2">
                        {post.ctf_name && (
                            <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">
                                {post.ctf_name}
                            </span>
                        )}
                        {post.category && (
                            <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">
                                {post.category}
                            </span>
                        )}
                        {post.difficulty && (
                            <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">
                                {post.difficulty}
                            </span>
                        )}
                        {post.points && (
                            <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">
                                ({post.points} pts)
                            </span>
                        )}
                    </p>

                    {post.flag && (
                        <p className="mt-4 text-green-500 font-mono text-xl">
                            {post.flag}
                        </p>
                    )}
                </header>
            </Background>
            <AutoBackground isEven={true}>
                <article className="pt-4 px-[5%]">
                    {post.content.map((block, idx) => renderBlock(block, idx))}
                </article>
            </AutoBackground>
        </div>
    );
}

export default WriteUpPage;