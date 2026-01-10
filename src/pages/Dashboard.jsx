import Background from "../components/Backgrounds/Background"
import TotalChallenges from "../components/Dashboard/HeroStats/TotalChallenges/TotalChallenges"
import TotalPoints from "../components/Dashboard/HeroStats/TotalPoints/TotalPoints"
import UsedPlatforms from "../components/Dashboard/HeroStats/UsedPlatforms/UsedPlatforms"
import StatsContainer from "../components/Dashboard/StatsContainer/StatsContainer"

function Dashboard(){
    return(
        <Background>
            <StatsContainer>
                <TotalChallenges />
            </StatsContainer>
            <StatsContainer>
                <TotalPoints />
            </StatsContainer>
            <StatsContainer>
                <UsedPlatforms />
            </StatsContainer>
        </Background>
    )
}

export default Dashboard