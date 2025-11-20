import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function ContactLinks({ text, link, icon }) {
    const handleLinkPress = (url) => {
        window.open(url);
    };

    const handleIcon = (iconName) => {
        if (iconName === "phone") return faPhone;
        if (iconName === "email") return faEnvelope;
        if (iconName === "github") return faGithub;
        if (iconName === "linkedin") return faLinkedin;
    };

    const selectedIcon = handleIcon(icon);

    return (
        <li className="text-body text-2xl mb-5 text-[#C7FCEC] flex items-center">
            <span className="bg-[#00FF88] text-[#0A0F14] rounded-full w-12 h-12 mr-3 inline-flex items-center justify-center">
                <FontAwesomeIcon icon={selectedIcon} />
            </span>

            {link ? (
                <span
                    onClick={() => handleLinkPress(link)}
                    className="cursor-pointer text-lg neon-hover"
                >
                    {text}
                </span>
            ) : (
                <span className="text-lg">
                    {text}
                </span>
            )}
        </li>
    );
}

export default ContactLinks;