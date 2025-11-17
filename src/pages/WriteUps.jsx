import { useState, useEffect } from "react";
import Background from "../components/Background";
import AutoBackground from "../components/AutoBackground";
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

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/writeups.json")
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
            setFiltered(data);
            setCategories([...new Set(data.map((p) => p.category).filter(Boolean))]);
            setPlatforms([...new Set(data.map((p) => p.ctf_name).filter(Boolean))]);
        })
        .catch((err) => console.error("Failed to load writeups.json:", err));
    }, []);

    useEffect(() => {
        let results = posts;
        if (category) results = results.filter((p) => p.category === category);
        if (platform) results = results.filter((p) => p.ctf_name === platform);
        if (search)
        results = results.filter((p) =>
            (p.title || p.slug).toLowerCase().includes(search.toLowerCase())
        );

        setFiltered(results);
        setPage(1);
    }, [category, platform, search, posts]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(Math.max(1, page), totalPages);
    if (safePage !== page) setPage(safePage);

    const startIndex = (safePage - 1) * PAGE_SIZE;
    const currentPosts = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    // debug: show counts in console (remove later)
    console.log("filtered.length:", filtered.length, "currentPosts.length:", currentPosts.length, "page:", safePage);

    const useAuto = currentPosts.length > 5; // <-- posts displayed on this page
    const Wrapper = useAuto ? AutoBackground : Background;

    const getDescription = (content) => {
        if (!content || !Array.isArray(content)) return "";
        const paraBlock = content.find((b) => b.type === "paragraph");
        return paraBlock ? paraBlock.text : "";
    };

    return (
    <Wrapper>
        <div className="px-[5%] pt-5">
            <Toolbar>
            <Search value={search} handleChange={setSearch} />
            <Dropdown options={categories} handleSelect={setCategory} message="Category" />
            <Dropdown options={platforms} handleSelect={setPlatform} message="Platform" />
            </Toolbar>

            <div className="grid gap-4 mt-5">
                {currentPosts.map((post) => (
                    <LinkBlock key={post.slug} post={post} getDescription={getDescription} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-6 text-[#C7FCEC]">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}
                            className="px-4 py-2 bg-[#121A22] rounded disabled:opacity-50">Prev</button>
                    <span>Page {safePage} of {totalPages}</span>
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
                            className="px-4 py-2 bg-[#121A22] rounded disabled:opacity-50">Next</button>
                </div>
            )}
        </div>
    </Wrapper>
    );
}

export default WriteUps;