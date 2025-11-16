import { Link } from "react-router-dom";
import WebAppImage from "../../assets/web-app.webp"
import PrivEscImage from "../../assets/priv-esc.webp"
import WindowsImage from "../../assets/windows.webp"
import OsintImage from "../../assets/osint.webp"
import CryptographyImage from "../../assets/cryptography.webp"
import DatabaseImage from "../../assets/database.webp"
import LinuxImage from "../../assets/linux.webp"

function LinkBlock({ post, getDescription }) {
    const renderImage = (category) => {
            const cat = category.toLowerCase();
    
            if (cat.includes("web")) {
                return <img className="h-4/5 w-auto" src={WebAppImage} alt="Globe" />;
            }
            if (cat.includes("priv") || cat.includes("escalation")) {
                return <img className="h-4/5 w-auto" src={PrivEscImage} alt="ID card" />;
            }
            if (cat.includes("windows")) {
                return <img className="h-4/5 w-auto" src={WindowsImage} alt="Windows logo" />;
            }
            if (cat.includes("osint")) {
                return <img className="h-4/5 w-auto" src={OsintImage} alt="Magnifying glass" />;
            }
            if (cat.includes("password") || cat.includes("crypto")) {
                return <img className="h-4/5 w-auto" src={CryptographyImage} alt="Lock" />;
            }
            if (cat.includes("database") || cat.includes("sql")) {
                return <img className="h-4/5 w-auto" src={DatabaseImage} alt="Database" />;
            }
            if (cat.includes("linux")) {
                return <img className="h-4/5 w-auto" src={LinuxImage} alt="Penguin" />;
            }
    
            return null; // fallback
        };
    
    
    return (
        <Link
            key={post.slug}
            to={`/writeups/${post.slug}`}
            className="grid grid-cols-6 px-4 py-2 bg-[#121A22] border-2 border-[#00FF88] rounded-xl shadow hover:shadow-lg transition"
        >   
            <div className="col-span-1 flex items-center">
                {renderImage(post.category)}
            </div>

            <div className="col-span-5 my-auto items-center">
                <h2 className="headings text-xl font-bold text-[#00FF88] hover:text-white neon-hover">
                    {post.title}
                </h2>

                {post.points && (
                    <p className="flex flex-row gap-2 mt-2 text-sm text-[#00FF88]">
                        <span className="text-body border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.category}</span>
                        <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.ctf_name}</span>
                        <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.difficulty}</span>
                        <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.points} pts</span>
                    </p>
                )}

                <p className="text-[#C7FCEC] text-body mt-2 line-clamp-2">
                    {getDescription(post.content)}
                </p>
            </div>
        </Link>
    );
}

export default LinkBlock;
