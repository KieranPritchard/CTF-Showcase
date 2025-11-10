import Background from "../components/Background"
import About from "../components/home_page/About"
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
                
            </Background>
        </>
    )
}

export default Home