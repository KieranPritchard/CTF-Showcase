import { Link } from "react-router-dom";
import WebAppImage from "../../../assets/web-app.webp";
import PrivEscImage from "../../../assets/priv-esc.webp";
import WindowsImage from "../../../assets/windows.webp";
import OsintImage from "../../../assets/osint.webp";
import CryptographyImage from "../../../assets/cryptography.webp";
import DatabaseImage from "../../../assets/database.webp";
import LinuxImage from "../../../assets/linux.webp";

function LinkBlock({ post, getDescription }) {
    
    // Decides which image to render
    const renderImage = (category) => {
        // Stores the category in lower case
        const cat = category.toLowerCase();

        // Checks which image to return and render
        if (cat.includes("web")) return <img className="h-20 w-auto mx-auto" src={WebAppImage} alt="Globe" />;
        if (cat.includes("priv") || cat.includes("escalation")) return <img className="h-20 w-auto mx-auto" src={PrivEscImage} alt="ID card" />;
        if (cat.includes("windows")) return <img className="h-20 w-auto mx-auto" src={WindowsImage} alt="Windows logo" />;
        if (cat.includes("osint")) return <img className="h-20 w-auto mx-auto" src={OsintImage} alt="Magnifying glass" />;
        if (cat.includes("password") || cat.includes("crypto")) return <img className="h-20 w-auto mx-auto" src={CryptographyImage} alt="Lock" />;
        if (cat.includes("database") || cat.includes("sql")) return <img className="h-20 w-auto mx-auto" src={DatabaseImage} alt="Database" />;
        if (cat.includes("linux")) return <img className="h-20 w-auto mx-auto" src={LinuxImage} alt="Penguin" />;

        // Returns null if there isnt a image
        return null;
    };

    return (
        // Wraps the block in a link
        <Link
            // Extracts the slug from the post in parameters
            key={post.slug}
            to={`/write-ups/${post.slug}`}
            className="flex flex-col sm:grid sm:grid-cols-6 px-4 py-4 bg-[#121A22] border-2 border-[#00FF88] rounded-xl shadow hover:shadow-lg transition gap-2 sm:gap-0"
        >
            {/* Image */}
            <div className="col-span-1 flex justify-center sm:justify-start items-center mb-2 sm:mb-0">
                {renderImage(post.category)}
            </div>

            {/* Content */}
            <div className="col-span-5 flex flex-col justify-center">
                <h2 className="headings text-lg sm:text-xl font-bold text-[#00FF88] hover:text-white neon-hover">
                    {post.title}
                </h2>

                {/* Displays the topics */}
                {post.points && (
                    <div className="flex flex-wrap gap-2 mt-2 text-sm text-[#00FF88]">
                        <span className="text-body border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.category}</span>
                        <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.ctf_name}</span>
                        <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.difficulty}</span>
                        <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.points} pts</span>
                    </div>
                )}
                
                {/* Displays the description */}
                <p className="text-[#C7FCEC] text-body mt-2 line-clamp-2 sm:line-clamp-3">
                    {getDescription(post.content)}
                </p>
            </div>
        </Link>
    );
}

export default LinkBlock;