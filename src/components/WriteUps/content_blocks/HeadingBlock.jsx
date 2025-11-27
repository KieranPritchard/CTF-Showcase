export default function HeadingBlock({ block }) {
    // Determine which HTML heading tag to use (h1, h2, etc.)
    // This ensures proper semantics and improves accessibility + SEO.
    const HeadingTag = block.level === 1 ? "h1" : "h2";

    return (
        <HeadingTag
            // Apply neon styling + dynamic text sizing based on heading level.
            // Level 1 → large neon title
            // Level 2 → smaller subsection heading
            className={`
                text-[#00FF88] 
                headings 
                font-bold 
                mt-6 mb-3
                ${block.level === 1 ? "text-3xl" : "text-xl"}
            `}
        >
            {/* Render the actual heading text provided in the block */}
            {block.text}
        </HeadingTag>
    );
}