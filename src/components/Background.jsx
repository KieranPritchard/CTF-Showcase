function Background({children, isEven}){
    return(
        <div className={isEven ? "h-screen bg-gray-500 px-4" : "h-screen px-4"}>
            {children}
        </div>
    )
}

export default Background