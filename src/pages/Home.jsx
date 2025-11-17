import { useState, useEffect } from "react";
import Background from "../components/Background";
import AutoBackground from "../components/AutoBackground";
import About from "../components/home_page/About";
import Recents from "../components/home_page/Recents";
import Welcome from "../components/home_page/Welcome";
import ImageBackground from "../components/ImageBackground";
import Banner from "../assets/banner.png";

function Home() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // mobile breakpoint
        };

        handleResize(); // initial check
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const AboutWrapper = isMobile ? AutoBackground : Background;
    const RecentsWrapper = isMobile ? AutoBackground : Background;

    return (
        <>
            <ImageBackground isEven={false} image={Banner}>
                <div className="flex justify-center items-end h-screen">
                    <Welcome />
                </div>
            </ImageBackground>

            <AboutWrapper isEven={true}>
                <About />
            </AboutWrapper>

            <RecentsWrapper isEven={false}>
                <Recents />
            </RecentsWrapper>
        </>
    );
}

export default Home;