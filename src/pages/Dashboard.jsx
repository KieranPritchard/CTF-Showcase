import Background from "../components/Backgrounds/Background"
import DomainChart from "../components/Dashboard/DomainChart/DomainChart"
import TotalChallenges from "../components/Dashboard/HeroStats/TotalChallenges/TotalChallenges"
import TotalPoints from "../components/Dashboard/HeroStats/TotalPoints/TotalPoints"
import UsedPlatforms from "../components/Dashboard/HeroStats/UsedPlatforms/UsedPlatforms"
import StatsContainer from "../components/Dashboard/StatsContainer/StatsContainer"
import TimelineChart from "../components/Dashboard/TimelineChart/TimelineChart"

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
            <StatsContainer>
                <DomainChart />
            </StatsContainer>
            <StatsContainer>
                <TimelineChart />
            </StatsContainer>
        </Background>
    )
}

export default Dashboard