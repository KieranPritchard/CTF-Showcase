import Background from "../components/Background"
import About from "../components/home_page/About"
import Recents from "../components/home_page/Recents"
import Welcome from "../components/home_page/Welcome"
import ImageBackground from "../components/ImageBackground"
import Banner from "../assets/banner.png"

function Home(){
    return(
        <>
            <ImageBackground isEven={false} image={Banner}>
                <div className="flex justify-center items-end h-screen">
                    <Welcome />
                </div>
            </ImageBackground>
            <Background isEven={true}>
                <About />
            </Background>
            <Background isEven={false}>
                <Recents />
            </Background>
        </>
    )
}

export default Home