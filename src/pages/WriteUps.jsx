import { useState, useEffect } from "react";
import Background from "../components/backgrounds/Background";
import AutoBackground from "../components/backgrounds/AutoBackground";
import Dropdown from "../components/write_ups/dropdown/Dropdown";
import Search from "../components/write_ups/search/Search";
import Toolbar from "../components/write_ups/toolbar/Toolbar";
import LinkBlock from "../components/write_ups/linkblock/LinkBlock";
import Pagination, { PAGE_SIZE } from "../components/write_ups/pagination/Pagination";
import Notification from "../components/notification/Notification";

function WriteUps() {
    const [posts, setPosts] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [categories, setCategories] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    const [category, setCategory] = useState("");
    const [platform, setPlatform] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [page, setPage] = useState(1);

    const [notif, setNotif] = useState(null);

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

    useEffect(() => {
        let result = posts;

        if (category) result = result.filter(p => p.category === category);
        if (platform) result = result.filter(p => p.ctf_name === platform);

        if (searchQuery)
            result = result.filter(p =>
                (p.title || p.slug).toLowerCase().includes(searchQuery.toLowerCase())
            );

        setFiltered(result);
        setPage(1);
    }, [category, platform, searchQuery, posts]);

    const startIndex = (page - 1) * PAGE_SIZE;
    const currentPosts = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    const useAuto = currentPosts.length > 5;
    const Wrapper = useAuto ? AutoBackground : Background;

    const getDescription = (content) => {
        if (!Array.isArray(content)) return "";
        const block = content.find(b => b.type === "paragraph");
        return block ? block.text : "";
    };

    const handleSearchChange = (value, submit = false) => {
    setSearchInput(value);

    if (submit) {
        const trimmed = value.trim();

        if (trimmed === "") {
            setNotif({ type: "warning", message: "Search cannot be empty!" });
            return;
        } else if (trimmed == "music"){
            setNotif({ type: "info", message: "go to: '/playlist'" });
            return;
        }

        // SAFELY detect "XSS-like" input and trigger Easter egg
        const looksLikeXSS = /<[^>]+>|on\w+=/i.test(trimmed);

            if (looksLikeXSS) {
                setNotif({
                    type: "success",
                    message: "Nice try... Think I would let you do that!"
                });
                return; // skip normal search
            }

            // normal search query
            setSearchQuery(value);
        }
    };


    return (
        <Wrapper>
            {/* FIXED: Toast appears top-right overlay */}
            {notif && (
                <div className="fixed top-4 right-4 z-50">
                    <Notification
                        type={notif.type}
                        message={notif.message}
                        duration={2500}
                        onClose={() => setNotif(null)}
                    />
                </div>
            )}

            <div className="px-[5%] pt-5">
                <Toolbar>
                    <Search value={searchInput} handleChange={handleSearchChange} />
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