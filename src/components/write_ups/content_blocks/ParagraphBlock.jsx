function ParagraphBlock({block, index}){
    return(
        <p
            key={index} 
            className="px-5 my-3 text-[#C7FCEC] leading-relaxed"
        >
            {block.text}
        </p>
    )
}

export default ParagraphBlock