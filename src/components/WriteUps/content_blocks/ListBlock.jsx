function ListItem({ block, index }) {
    return (
        <ul
            // Key helps React identify this block if it's part of a rendered list of blocks
            key={index}

            // Adds spacing + indentation + bullet styling
            className="px-5 ml-6 text-[#C7FCEC] list-disc my-3"
        >
            {/* Render each list item inside the block */}
            {block.items.map((item, i) => (
                <li 
                    key={i} // Key for each individual <li> to preserve stable render ordering
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}

export default ListItem;