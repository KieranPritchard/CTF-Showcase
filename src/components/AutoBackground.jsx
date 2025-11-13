function AutoBackground({children, isEven}){
    return(
        <div className={isEven ? "h-auto bg-[#121A22] px-4" : "h-auto bg-[#0A0F14] px-4"}>
            {children}
        </div>
    )
}

export default AutoBackground