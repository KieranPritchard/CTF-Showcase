// This is a background with automatic sizing
function AutoBackground({children, isEven}){
    return(
        <div className={isEven ? "h-auto bg-[#121A22] px-4 pb-[3%]" : "h-auto bg-[#0A0F14] px-4 pb-[3%]"}>
            {children}
        </div>
    )
}

export default AutoBackground