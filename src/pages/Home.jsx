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
    // State to check if the view is on mobile
    const [isMobile, setIsMobile] = useState(false);

    // Use effect to handle resize
    useEffect(() => {
        // Handle resize function
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // mobile breakpoint
        };

        handleResize(); // initial check
        window.addEventListener("resize", handleResize); // event listener to check if the screen is mobil size

        // Returns the removed event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Wrappers for the different sections
    const AboutWrapper = isMobile ? AutoBackground : Background;
    const RecentsWrapper = isMobile ? AutoBackground : Background;
    const SkillsWrapper = isMobile ? AutoBackground : Background;

    return (
        <>
            {/* Hero section with banner and welcome */}
            <ImageBackground isEven={false} image={Banner}>
                <div className="flex justify-center items-end h-screen">
                    <Welcome />
                </div>
            </ImageBackground>

            {/* About section */}
            <AboutWrapper isEven={true}>
                <About />
            </AboutWrapper>

            {/* Skills section */}
            <SkillsWrapper>
                <Skills />
            </SkillsWrapper>

            {/* Recent write-ups section */}
            <RecentsWrapper isEven={true}>
                <Recents />
            </RecentsWrapper>
        </>
    );
}

export default Home;