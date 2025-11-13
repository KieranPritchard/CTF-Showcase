function Toolbar({children}){
    return(
        <div className="bg-[#121A22] py-4 rounded-lg flex flex-row justify-center gap-2">
            {children}
        </div>
    )
}

export default Toolbar