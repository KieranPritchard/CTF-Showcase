function ListItem({block, index}){
    return(
        <ul
            key={index}
            className="px-5 ml-6 text-[#C7FCEC] list-disc my-3"
        >
            {block.items.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    )
}

export default ListItem