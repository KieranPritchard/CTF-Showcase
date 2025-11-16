function RecentWriteUp({ title, description }) {
    return (
        <div className="flex flex-col justify-between w-80 h-80 p-6 rounded-lg bg-[#121A22] border border-[#00FF88] shadow-[0_0_20px_#00FF88,0_0_40px_#00FF88,0_0_60px_#00FF88]">
            <div>
                <h3 className="headings text-lg mb-3 font-bold text-[#00FF88]">{title}</h3>
                <p className="text-[#C7FCEC] text-body leading-relaxed overflow-hidden">
                    {description.length > 180 ? description.slice(0, 180) + "..." : description}
                </p>
            </div>
        </div>
    );
}

export default RecentWriteUp;