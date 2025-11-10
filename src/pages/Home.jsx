import Background from "../components/Background"
import About from "../components/home_page/About"
import Recents from "../components/home_page/Recents"
import Welcome from "../components/home_page/Welcome"

function Home(){
    return(
        <>
            <Background isEven={false}>
                <div className="flex justify-center items-end h-screen">
                    <Welcome />
                </div>
            </Background>
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