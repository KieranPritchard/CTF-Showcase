import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import AutoBackground from "../components/backgrounds/AutoBackground";
import Background from "../components/backgrounds/Background";
import Carousel from "../components/write_ups/carousel/Carousel";

// Category Images
import WebAppImage from "../assets/web-app.webp";
import PrivEscImage from "../assets/priv-esc.webp";
import WindowsImage from "../assets/windows.webp";
import OsintImage from "../assets/osint.webp";
import CryptographyImage from "../assets/cryptography.webp";
import DatabaseImage from "../assets/database.webp";
import LinuxImage from "../assets/linux.webp";
import HeadingBlock from "../components/write_ups/content_blocks/HeadingBlock";
import SubheadingBlock from "../components/write_ups/content_blocks/SubheadingBlock";
import ParagraphBlock from "../components/write_ups/content_blocks/ParagraphBlock";
import ListItem from "../components/write_ups/content_blocks/ListBlock";
import CodeBlock from "../components/write_ups/content_blocks/CodeBlock";
import ImageBlock from "../components/write_ups/content_blocks/ImageBlock";

function WriteUpPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    const [validImages, setValidImages] = useState([]);

    useEffect(() => {
        fetch("https://kieranpritchard.github.io/CTF-Showcase/writeups.json")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((item) => item.slug === slug);
                setPost(found);
                setValidImages(found?.images || []);
                setLoading(false);
            })
            .catch((err) => console.error("Failed to load writeup:", err));
    }, [slug]);

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
                return <HeadingBlock block={block} index={index} />

            case "subheading":
                return <SubheadingBlock block={block} index={index} />

            case "paragraph":
                return <ParagraphBlock block={block} index={index} />

            case "list":
                return <ListItem block={block} index={index} />

            case "code":
                return <CodeBlock block={block} index={index} />

            case "image":
                return <ImageBlock block={block} index={index} />

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

            <AutoBackground isEven={true}>
                <article className="pt-4 px-[5%]">
                    {post.content.map((block, idx) => renderBlock(block, idx))}
                </article>

                {/* CAROUSEL */}
                {validImages?.length > 0 && <Carousel images={validImages} />}
            </AutoBackground>
        </div>
    );
}

export default WriteUpPage;