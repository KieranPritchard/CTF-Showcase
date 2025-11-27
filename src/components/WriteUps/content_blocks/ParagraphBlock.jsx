function ParagraphBlock({ block, index }) {
    return (
        <p
            // React key ensures stable rendering when used inside a list of dynamic blocks
            key={index}

            // Basic text styling for readability inside write-ups
            className="px-5 my-3 text-[#C7FCEC] leading-relaxed"
        >
            {/* Render the paragraph text from the write-up JSON */}
            {block.text}
        </p>
    );
}

export default ParagraphBlock;