function SubheadingBlock({ block, index }) {
    return (
        <h3
            // Key ensures React can track this element if part of a dynamic block list
            key={index}

            // Visual style for mid-level headings inside write-ups
            className="headings text-lg mt-5 mb-2 text-[#00FF88] font-semibold"
        >
            {/* Render the subheading text provided in the write-up JSON */}
            {block.text}
        </h3>
    );
}

export default SubheadingBlock;