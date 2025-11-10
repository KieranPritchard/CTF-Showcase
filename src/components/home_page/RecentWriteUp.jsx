function RecentWriteUp({title, description}){
    return(
        <div className="flex flex-col p-2 border rounded-md">
            <div>

            </div>
            <h3 className="text-lg mb-2 font-bold">{title}</h3>
            <p>
                {description}
            </p>
        </div>
    )
}

export default RecentWriteUp