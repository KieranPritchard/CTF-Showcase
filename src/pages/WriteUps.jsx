import { useState, useEffect, useRef } from "react";
import Background from "../components/Backgrounds/Background";
import AutoBackground from "../components/Backgrounds/AutoBackground";
import Dropdown from "../components/WriteUps/dropdown/Dropdown";
import Search from "../components/WriteUps/search/Search";
import Toolbar from "../components/WriteUps/toolbar/Toolbar";
import LinkBlock from "../components/WriteUps/linkblock/LinkBlock";
import Pagination, { PAGE_SIZE } from "../components/WriteUps/pagination/Pagination";
import Notification from "../components/Notifications/Notification";

function WriteUps() {
    // Full list of write-ups
    const [posts, setPosts] = useState([]);
    // Filtered list based on category, platform, or search query
    const [filtered, setFiltered] = useState([]);

    // Available categories and platforms for dropdowns
    const [categories, setCategories] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    // Currently selected filter values
    const [category, setCategory] = useState("");
    const [platform, setPlatform] = useState("");

    // Search input and search query
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Current page number for pagination
    const [page, setPage] = useState(1);

    // Notification state for warnings, info, or success messages
    const [notif, setNotif] = useState(null);

    // Refs for LinkBlock elements to observe their visibility for animation
    const linkRefs = useRef([]);

    // Load write-ups data on component mount
    useEffect(() => {
        fetch("https://kieranpritchard.github.io/CTF-Showcase/writeups.json")
        .then((r) => r.json())
        .then((data) => {
            setPosts(data);
            setFiltered(data);

            // Extract unique categories and platforms for dropdowns
            setCategories([...new Set(data.map(p => p.category).filter(Boolean))]);
            setPlatforms([...new Set(data.map(p => p.ctf_name).filter(Boolean))]);
        })
        .catch((err) => console.error("Failed to load writeups.json:", err));
    }, []);

    // Update filtered posts whenever filters or search query changes
    useEffect(() => {
        let result = posts;

        if (category) result = result.filter(p => p.category === category);
        if (platform) result = result.filter(p => p.ctf_name === platform);

        if (searchQuery)
        result = result.filter(p =>
            (p.title || p.slug).toLowerCase().includes(searchQuery.toLowerCase())
        );

    setFiltered(result);
    setPage(1); // Reset to first page whenever filter/search changes
    }, [category, platform, searchQuery, posts]);

    // Determine the posts for the current page
    const startIndex = (page - 1) * PAGE_SIZE;
    const currentPosts = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    // Decide which background component to use based on number of posts
    const useAuto = currentPosts.length > 5;
    const Wrapper = useAuto ? AutoBackground : Background;

    // Extract the first paragraph text as a description
    const getDescription = (content) => {
        if (!Array.isArray(content)) return "";
        const block = content.find(b => b.type === "paragraph");
        return block ? block.text : "";
    };

    // Handle search input and submission
    const handleSearchChange = (value, submit = false) => {
        setSearchInput(value);

    if (submit) {
        const trimmed = value.trim();

        if (trimmed === "") {
            setNotif({ type: "warning", message: "Search cannot be empty!" });
            return;
        } else if (trimmed === "music") {
            setNotif({ type: "info", message: "go to: '/playlist'" });
            return;
        }

        // Easter egg for XSS-like input
        const looksLikeXSS = /<[^>]+>|on\w+=/i.test(trimmed);
        if (looksLikeXSS) {
            setNotif({
            type: "success",
            message: "Nice try... Think I would let you do that!"
            });
            return;
        }

        // Set search query for filtering
        setSearchQuery(value);
        }
    };

    // Animate LinkBlock elements when they enter viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Animate only once
            }
            });
        },
        { threshold: 0.1 } // Trigger when 10% of element is visible
        );

        linkRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [currentPosts]); // Re-run when current posts change (pagination or filter)

    return (
        <Wrapper>
        {/* Toast notifications */}
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
            {/* Toolbar with search and dropdown filters */}
            <Toolbar>
            <Search value={searchInput} handleChange={handleSearchChange} />
            <Dropdown options={categories} handleSelect={setCategory} message="Category" />
            <Dropdown options={platforms} handleSelect={setPlatform} message="Platform" />
            </Toolbar>

            {/* Grid of LinkBlocks with fade-in animation */}
            <div className="grid gap-4 mt-5">
            {currentPosts.map((post, idx) => (
                <div
                key={post.slug}
                ref={(el) => (linkRefs.current[idx] = el)}
                className="fade-in-bottom"
                >
                <LinkBlock post={post} getDescription={getDescription} />
                </div>
            ))}
            </div>

            {/* Pagination controls */}
            <Pagination length={filtered.length} page={page} setPage={setPage} />
        </div>
        </Wrapper>
    );
}

export default WriteUps;