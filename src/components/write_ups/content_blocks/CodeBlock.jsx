function CodeBlock({block, index}){
    return(
        <pre
            key={index}
            className="code-text bg-black/40 text-[#00FF88] p-4 mx-5 rounded-lg overflow-x-auto my-4 border border-[#00FF88]"
        >
            <code>{block.code}</code>
        </pre>
    )
}

export default CodeBlock