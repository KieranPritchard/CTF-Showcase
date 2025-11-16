import WebAppImage from "../../assets/web-app.webp"
import PrivEscImage from "../../assets/priv-esc.webp"
import WindowsImage from "../../assets/windows.webp"
import OsintImage from "../../assets/osint.webp"
import CryptographyImage from "../../assets/cryptography.webp"
import DatabaseImage from "../../assets/database.webp"
import LinuxImage from "../../assets/linux.webp"

function RecentWriteUp({ title, description, category }) {
    
    const renderImage = (category) => {
        if (!category) return null;
        
        const cat = category.toLowerCase();
    
        if (cat.includes("web")) {
            return <img className="h-2/5 w-auto" src={WebAppImage} alt="Globe" />;
        }
        if (cat.includes("priv") || cat.includes("escalation")) {
            return <img className="h-2/5 w-auto" src={PrivEscImage} alt="ID card" />;
        }
        if (cat.includes("windows")) {
            return <img className="h-2/5 w-auto" src={WindowsImage} alt="Windows logo" />;
        }
        if (cat.includes("osint")) {
            return <img className="h-2/5 w-auto" src={OsintImage} alt="Magnifying glass" />;
        }
        if (cat.includes("password") || cat.includes("crypto")) {
            return <img className="h-2/5 w-auto" src={CryptographyImage} alt="Lock" />;
        }
        if (cat.includes("database") || cat.includes("sql")) {
            return <img className="h-2/5 w-auto" src={DatabaseImage} alt="Database" />;
        }
        if (cat.includes("linux")) {
            return <img className="h-2/5 w-auto" src={LinuxImage} alt="Penguin" />;
        }
    
        return null; // fallback
    };
    
    return (
        <div className="flex flex-col justify-between w-80 h-115 p-4 rounded-lg bg-[#121A22] border border-[#00FF88] shadow-[0_0_20px_#00FF88,0_0_40px_#00FF88,0_0_60px_#00FF88]">
            <div>
                <div>
                    {renderImage(category)}
                </div>
                <h3 className="headings text-lg text-center mb-3 font-bold text-[#00FF88]">{title}</h3>
                <p className="text-[#C7FCEC] text-body text-center leading-relaxed overflow-hidden">
                    {description.length > 180 ? description.slice(0, 180) + "..." : description}
                </p>
            </div>
        </div>
    );
}

export default RecentWriteUp;