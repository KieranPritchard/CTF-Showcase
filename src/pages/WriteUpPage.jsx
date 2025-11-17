import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import AutoBackground from "../components/AutoBackground";
import Background from "../components/Background";

// Category Images
import WebAppImage from "../assets/web-app.webp";
import PrivEscImage from "../assets/priv-esc.webp";
import WindowsImage from "../assets/windows.webp";
import OsintImage from "../assets/osint.webp";
import CryptographyImage from "../assets/cryptography.webp";
import DatabaseImage from "../assets/database.webp";
import LinuxImage from "../assets/linux.webp";

function WriteUpPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // Carousel state
    const [currentImage, setCurrentImage] = useState(0);

    // Swipe detection
    const startX = useRef(null);
    const endX = useRef(null);

    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        endX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (startX.current === null || endX.current === null) return;

        const diff = startX.current - endX.current;
        const threshold = 50;

        if (diff > threshold) {
            setCurrentImage((prev) =>
                prev === post.images.length - 1 ? 0 : prev + 1
            );
        } else if (diff < -threshold) {
            setCurrentImage((prev) =>
                prev === 0 ? post.images.length - 1 : prev - 1
            );
        }

        startX.current = null;
        endX.current = null;
    };

    useEffect(() => {
        fetch("https://kieranpritchard.github.io/CTF-Showcase/writeups.json")
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
    // CATEGORY IMAGE LOGIC
    // -----------------------------
    const renderImage = (category) => {
        const cat = category.toLowerCase();

        if (cat.includes("web")) return <img className="h-4/5 w-auto" src={WebAppImage} />;
        if (cat.includes("priv") || cat.includes("escalation")) return <img className="h-4/5 w-auto" src={PrivEscImage} />;
        if (cat.includes("windows")) return <img className="h-4/5 w-auto" src={WindowsImage} />;
        if (cat.includes("osint")) return <img className="h-4/5 w-auto" src={OsintImage} />;
        if (cat.includes("password") || cat.includes("crypto")) return <img className="h-4/5 w-auto" src={CryptographyImage} />;
        if (cat.includes("database") || cat.includes("sql")) return <img className="h-4/5 w-auto" src={DatabaseImage} />;
        if (cat.includes("linux")) return <img className="h-4/5 w-auto" src={LinuxImage} />;

        return null;
    };

    // -----------------------------
    // CONTENT BLOCK RENDERER
    // -----------------------------
    const renderBlock = (block, index) => {
        switch (block.type) {
            case "heading":
                return (
                    <h1
                        key={index}
                        className={`text-[#00FF88] headings font-bold mt-6 mb-3 ${
                            block.level === 1
                                ? "text-3xl"
                                : block.level === 2
                                ? "text-xl"
                                : "text-xl"
                        }`}
                    >
                        {block.text}
                    </h1>
                );

            case "subheading":
                return (
                    <h3
                        key={index}
                        className="headings text-lg mt-5 mb-2 text-[#00FF88] font-semibold"
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
                        className="code-text bg-black/40 text-[#00FF88] p-4 mx-5 rounded-lg overflow-x-auto my-4 border border-[#00FF88]"
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
    // PAGE OUTPUT
    // -----------------------------
    return (
        <div>
            <Background>
                <header className="flex flex-col justify-center px-[5%] h-full">
                    <div className="flex justify-center items-center border h-2/5 mb-5 rounded-xl text-[#00FF88]">
                        {renderImage(post.category)}
                    </div>

                    <h1 className="headings text-4xl mb-5 font-bold text-[#00FF88]">
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

            {/* -----------------------------
                ARTICLE FIRST
            ----------------------------- */}
            <AutoBackground isEven={true}>
                <article className="pt-4 px-[5%]">
                    {post.content.map((block, idx) => renderBlock(block, idx))}
                </article>

                {/* -----------------------------
                    CAROUSEL UNDER ARTICLE
                ----------------------------- */}
                {post.images && post.images.length > 0 && (
                    <div className="w-full flex flex-col items-center my-10 px-[5%]">
                        <h2 className="text-[#00FF88] text-2xl font-bold mb-4">Images</h2>

                        <div
                            className="relative w-full max-w-3xl select-none"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {/* Image */}
                            <img
                                src={post.images[currentImage].download_url}
                                alt={`Image ${currentImage + 1}`}
                                className="rounded-xl border border-[#00FF88] shadow-lg max-h-[500px] mx-auto object-contain bg-black/40"
                            />

                            {/* Left Button */}
                            <button
                                onClick={() =>
                                    setCurrentImage((prev) =>
                                        prev === 0 ? post.images.length - 1 : prev - 1
                                    )
                                }
                                className="absolute top-1/2 left-0 -translate-y-1/2 bg-black/60 text-[#00FF88] px-4 py-2 rounded-r-lg hover:bg-black/80"
                            >
                                ‹
                            </button>

                            {/* Right Button */}
                            <button
                                onClick={() =>
                                    setCurrentImage((prev) =>
                                        prev === post.images.length - 1 ? 0 : prev + 1
                                    )
                                }
                                className="absolute top-1/2 right-0 -translate-y-1/2 bg-black/60 text-[#00FF88] px-4 py-2 rounded-l-lg hover:bg-black/80"
                            >
                                ›
                            </button>
                        </div>

                        {/* Indicators */}
                        <div className="flex gap-2 mt-4">
                            {post.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentImage(i)}
                                    className={`h-3 w-3 rounded-full ${
                                        currentImage === i ? "bg-[#00FF88]" : "bg-gray-500"
                                    }`}
                                ></button>
                            ))}
                        </div>
                    </div>
                )}
            </AutoBackground>
        </div>
    );
}

export default WriteUpPage;