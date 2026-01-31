import WebAppImage from "../../assets/web-app.webp";
import PrivEscImage from "../../assets/priv-esc.webp";
import WindowsImage from "../../assets/windows.webp";
import OsintImage from "../../assets/osint.webp";
import CryptographyImage from "../../assets/cryptography.webp";
import DatabaseImage from "../../assets/database.webp";
import LinuxImage from "../../assets/linux.webp";

// Card for a recent write-up preview (image, title, description)
function RecentWriteUp({ title, description, category }) {
    // Decides which image to render based on category
    const renderImage = (category) => {
        if (!category) return null;

        // Stores the category in lower case
        const cat = category.toLowerCase();

        // Checks which image to return and render
        if (cat.includes("web")) {
            return <img className="h-[200px] w-auto" src={WebAppImage} alt="Globe" />;
        }
        if (cat.includes("priv") || cat.includes("escalation")) {
            return <img className="h-[200px] w-auto" src={PrivEscImage} alt="ID card" />;
        }
        if (cat.includes("windows")) {
            return <img className="h-[200px] w-auto" src={WindowsImage} alt="Windows logo" />;
        }
        if (cat.includes("osint")) {
            return <img className="h-[200px] w-auto" src={OsintImage} alt="Magnifying glass" />;
        }
        if (cat.includes("password") || cat.includes("crypto")) {
            return <img className="h-[200px] w-auto" src={CryptographyImage} alt="Lock" />;
        }
        if (cat.includes("database") || cat.includes("sql")) {
            return <img className="h-[200px] w-auto" src={DatabaseImage} alt="Database" />;
        }
        if (cat.includes("linux")) {
            return <img className="h-[200px] w-auto" src={LinuxImage} alt="Penguin" />;
        }

        // Returns null if there isnt a image
        return null;
    };

    return (
        <div className="flex flex-col justify-between w-80 h-100 p-4 rounded-lg bg-[#121A22] border border-[#00FF88] shadow-[0_0_20px_#00FF88,0_0_40px_#00FF88,0_0_60px_#00FF88]">
            <div>
                {/* Category-based icon */}
                <div className="flex justify-center">
                    {renderImage(category)}
                </div>

                {/* Title of the write-up */}
                <h3 className="headings text-2xl text-center mb-3 font-bold text-[#00FF88]">
                    {title}
                </h3>

                {/* Description preview (trimmed to ensure consistent layout) */}
                <p className="text-[#C7FCEC] text-body text-md text-center leading-relaxed overflow-hidden">
                    {description.length > 180
                        ? description.slice(0, 180) + "..."
                        : description}
                </p>
            </div>
        </div>
    );
}

export default RecentWriteUp;