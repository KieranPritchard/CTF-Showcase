import { useState, useEffect } from "react";
import Background from "../components/Backgrounds/Background";
import AutoBackground from "../components/Backgrounds/AutoBackground";
import About from "../components/HomePage/About";
import Recents from "../components/HomePage/Recents";
import Welcome from "../components/HomePage/Welcome";
import ImageBackground from "../components/Backgrounds/ImageBackground";
import Banner from "../assets/banner.png";
import Skills from "../components/HomePage/Skills";

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
    const SkillsWrapper = isMobile ? AutoBackground : Background;

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

            <SkillsWrapper>
                <Skills />
            </SkillsWrapper>

            <RecentsWrapper isEven={true}>
                <Recents />
            </RecentsWrapper>
        </>
    );
}

export default Home;