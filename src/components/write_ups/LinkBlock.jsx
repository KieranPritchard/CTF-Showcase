import { Link } from "react-router-dom";

function LinkBlock({ post, getDescription }) {
    return (
        <Link
            key={post.slug}
            to={`/writeups/${post.slug}`}
            className="grid grid-cols-6 p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
        >   
            <div className="col-span-1"></div>
            <div className="col-span-5">
                <h2 className="text-xl mt-2 font-bold">{post.title}</h2>
                {post.points && (
                    <p className="text-sm text-gray-500">
                        {post.category} · {post.platform} · {post.difficulty} ({post.points} pts)
                    </p>
                )}
                <p className="text-gray-700 mt-2 line-clamp-2">
                    {getDescription(post.content)}
                </p>
            </div>
        </Link>
    );
}

export default LinkBlock;
