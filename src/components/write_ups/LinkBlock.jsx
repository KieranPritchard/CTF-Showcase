import { Link } from "react-router-dom";

function LinkBlock({ post, getDescription }) {
    return (
        <Link
            key={post.slug}
            to={`/writeups/${post.slug}`}
            className="grid grid-cols-6 p-4 bg-[#121A22] border-2 border-[#00FF88] rounded-xl shadow hover:shadow-lg transition"
        >   
            <div className="col-span-1"></div>
            <div className="col-span-5">
                <h2 className="text-xl mt-2 font-bold text-[#00FF88] hover:text-white neon-hover">{post.title}</h2>
                {post.points && (
                    <p className="flex flex-row gap-2 mt-2 text-sm text-[#00FF88]">
                        <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.category}</span> <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.ctf_name}</span> <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.difficulty}</span> <span className="border-2 border-[#00FF88] p-1 px-2 rounded-4xl">{post.points} pts</span>
                    </p>
                )}
                <p className="text-[#C7FCEC] mt-2 line-clamp-2">
                    {getDescription(post.content)}
                </p>
            </div>
        </Link>
    );
}

export default LinkBlock;
