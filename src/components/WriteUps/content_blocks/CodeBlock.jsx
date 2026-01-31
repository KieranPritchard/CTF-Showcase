import { useState } from "react";

// Code block with copy-to-clipboard button
export default function CodeBlock({ block }) {
    // State to show copied feedback
    const [copied, setCopied] = useState(false);

    // Copies the code to clipboard and shows feedback
    const handleCopy = () => {
        navigator.clipboard.writeText(block.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div className="relative mx-5 my-4">
            {/* Copy button */}
            <button
                onClick={handleCopy}
                className="
                    absolute top-2 right-2 text-xs px-2 py-1 rounded
                    bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]
                    hover:bg-[#00FF88]/30 transition
                "
            >
                {copied ? "Copied!" : "Copy"}
            </button>

            {/* Code block content */}
            <pre
                className="
                    code-text bg-black/40 text-[#00FF88]
                    p-4 rounded-lg overflow-x-auto border border-[#00FF88]
                "
            >
                <code className="whitespace-pre-wrap wrap-break-word">
                    {block.code}
                </code>
            </pre>
        </div>
    );
}