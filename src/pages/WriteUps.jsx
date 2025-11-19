import { useState, useEffect } from "react";
import Background from "../components/Background";
import AutoBackground from "../components/AutoBackground";
import Dropdown from "../components/write_ups/Dropdown";
import Search from "../components/write_ups/Search";
import Toolbar from "../components/write_ups/Toolbar";
import LinkBlock from "../components/write_ups/LinkBlock";
import Pagination, { PAGE_SIZE } from "../components/Pagination";

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
        fetch("https://kieranpritchard.github.io/CTF-Showcase/writeups.json")
            .then((r) => r.json())
            .then((data) => {
                setPosts(data);
                setFiltered(data);
                setCategories([...new Set(data.map(p => p.category).filter(Boolean))]);
                setPlatforms([...new Set(data.map(p => p.ctf_name).filter(Boolean))]);
            })
            .catch((err) => console.error("Failed to load writeups.json:", err));
    }, []);

    // Filtering
    useEffect(() => {
        let result = posts;

        if (category) result = result.filter(p => p.category === category);
        if (platform) result = result.filter(p => p.ctf_name === platform);
        if (search)
            result = result.filter(p =>
                (p.title || p.slug).toLowerCase().includes(search.toLowerCase())
            );

        setFiltered(result);
        setPage(1);
    }, [category, platform, search, posts]);

    // Pagination slice
    const startIndex = (page - 1) * PAGE_SIZE;
    const currentPosts = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    const useAuto = currentPosts.length > 5;
    const Wrapper = useAuto ? AutoBackground : Background;

    const getDescription = (content) => {
        if (!Array.isArray(content)) return "";
        const block = content.find(b => b.type === "paragraph");
        return block ? block.text : "";
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

                <Pagination length={filtered.length} page={page} setPage={setPage} />
            </div>
        </Wrapper>
    );
}

export default WriteUps;