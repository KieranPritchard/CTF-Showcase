import { useState, useEffect } from "react";

export default function Notification({
    type = "success",
    message = "",
    duration = 5000,
    onClose,
}) {
    // Controls the fade-in / fade-out animation state
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger the fade-in animation immediately
        setVisible(true);

        // Auto-close after the specified duration
        const timer = setTimeout(() => handleClose(), duration);

        // Cleanup timeout if component unmounts early
        return () => clearTimeout(timer);
    }, [duration]);

    // Handles closing animation + delayed callback
    const handleClose = () => {
        setVisible(false); // triggers fade-out

        // Wait for CSS transition to finish before removing element
        setTimeout(() => onClose?.(), 300);
    };

    /**
     * Predefined color themes for each notification type.
     * Using static class names ensures Tailwind doesn't purge them.
     */
    const colorClasses = {
        success: {
            bg: "bg-[#457B9D]/20",
            text: "text-[#457B9D]",
            bar: "bg-[#457B9D]",
        },
        error: {
            bg: "bg-[#E63946]/20",
            text: "text-[#E63946]",
            bar: "bg-[#E63946]",
        },
        warning: {
            bg: "bg-[#F4D35E]/20",
            text: "text-[#F4D35E]",
            bar: "bg-[#F4D35E]",
        },
        info: {
            bg: "bg-[#2A9D8F]/20",
            text: "text-[#2A9D8F]",
            bar: "bg-[#2A9D8F]",
        },
    };

    // Fallback to "success" theme if unknown type is provided
    const theme = colorClasses[type] || colorClasses.success;

    return (
        // Notification container with slide + fade animation
        <div
            className={`
                flex items-center justify-between max-w-md w-full my-2 h-12 shadow rounded-md
                ${theme.bg} ${theme.text}
                transform transition-all duration-300 ease-in-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
            `}
        >
            {/* Left accent bar colored based on notification type */}
            <div className={`h-full w-1.5 ${theme.bar} rounded-l-md`} />

            {/* Message content + icon */}
            <div className="flex items-center flex-1 px-3">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                >
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                    <circle cx="12" cy="12" r="9" />
                </svg>

                <p className="text-sm">{message}</p>
            </div>

            {/* Close button to manually dismiss the notification */}
            <button
                type="button"
                aria-label="close"
                className="px-3 hover:scale-90 transition-transform"
                onClick={handleClose}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15 5L5 15M5 5L15 15"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
}