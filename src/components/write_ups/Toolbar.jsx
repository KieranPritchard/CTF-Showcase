function Toolbar({children}){
    return(
        <div className="bg-gray-200 py-4 rounded-lg mt-5 flex flex-row justify-center gap-2">
            {children}
        </div>
    )
}

export default Toolbar