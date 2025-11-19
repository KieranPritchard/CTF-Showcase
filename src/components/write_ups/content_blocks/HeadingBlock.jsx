function HeadingBlock({block, index}){
    return(
        <h1
            key={index}
            className={`text-[#00FF88] headings font-bold mt-6 mb-3 ${
                block.level === 1 ? "text-3xl" : "text-xl"
            }`}
        >
            {block.text}
        </h1>
    )
}

export default HeadingBlock