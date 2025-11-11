import Background from "../components/Background"
import Search from "../components/write_ups/Search"
import Toolbar from "../components/write_ups/Toolbar"

function WriteUps(){
    return(
        <>
            <Background isEven={false}>
                <Toolbar>
                    <Search />
                </Toolbar>
            </Background>
        </>
    )
}

export default WriteUps