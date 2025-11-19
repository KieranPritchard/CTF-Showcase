function SubheadingBlock({block, index}){
    return(
        <h3
            key={index}
            className="headings text-lg mt-5 mb-2 text-[#00FF88] font-semibold"
        >
            {block.text}
        </h3>
    )
}

export default SubheadingBlock