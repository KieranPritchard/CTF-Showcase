function Toolbar({ children }) {
    return (
        <div className="
            bg-[#121A22] 
            py-4 px-2
            rounded-lg 
            flex 
            flex-col sm:flex-row 
            justify-center 
            sm:gap-2 gap-1
            items-center
            w-full
        ">
            {children}
        </div>
    );
}

export default Toolbar;