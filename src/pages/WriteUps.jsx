import Background from "../components/Background"
import Toolbar from "../components/write_ups/Toolbar"

function WriteUps(){
    return(
        <>
            <Background isEven={false}>
                <Toolbar />
            </Background>
        </>
    )
}

export default WriteUps