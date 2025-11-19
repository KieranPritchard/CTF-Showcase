function ImageBlock({index, block}){
    return(
        <img
            key={index}
            src={block.src}
            alt={block.alt}
            className="rounded-xl shadow my-4 border border-[#00FF88]"
            onError={(e) => (e.currentTarget.style.display = "none")}
        />
    )
}

export default ImageBlock