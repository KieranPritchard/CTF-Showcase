import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Background from "../components/Background";
import Dropdown from "../components/write_ups/Dropdown";
import Search from "../components/write_ups/Search";
import Toolbar from "../components/write_ups/Toolbar";
import LinkBlock from "../components/write_ups/LinkBlock";

const PAGE_SIZE = 10;

function WriteUps() {
    const [posts, setPosts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [category, setCategory] = useState("");
    const [platform, setPlatform] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    // ✅ Fetch from local JSON file
    useEffect(() => {
        fetch("/writeups.json")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setFiltered(data);

                // Extract unique categories and platforms for dropdowns
                setCategories([...new Set(data.map((p) => p.category).filter(Boolean))]);
                setPlatforms([...new Set(data.map((p) => p.platform).filter(Boolean))]);
            })
            .catch((err) => console.error("Failed to load writeups.json:", err));
    }, []);

    // ✅ Handle filtering and searching
    useEffect(() => {
        let results = posts;
        if (category) results = results.filter((p) => p.category === category);
        if (platform) results = results.filter((p) => p.platform === platform);
        if (search)
            results = results.filter((p) =>
                (p.title || p.slug).toLowerCase().includes(search.toLowerCase())
            );

        setFiltered(results);
        setPage(1);
    }, [category, platform, search, posts]);

    // ✅ Pagination
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const startIndex = (page - 1) * PAGE_SIZE;
    const currentPosts = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    // ✅ Helper to get first paragraph block as description
    const getDescription = (content) => {
        if (!content || !Array.isArray(content)) return "";
        const paraBlock = content.find((b) => b.type === "paragraph");
        return paraBlock ? paraBlock.text : "";
    };

    return (
        <Background>
            <div className="px-[5%]">
                <Toolbar>
                    <Search handleChange={setSearch} />
                    <Dropdown options={categories} handleSelect={setCategory} message="Category" />
                    <Dropdown options={platforms} handleSelect={setPlatform} message="Platform" />
                </Toolbar>

                <div className="grid gap-4 p-6">
                    {currentPosts.map((post) => (
                        <LinkBlock key={post.slug} post={post} getDescription={getDescription} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 py-6">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </Background>
    );
}

export default WriteUps;