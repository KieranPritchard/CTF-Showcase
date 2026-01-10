import AutoBackground from "../components/Backgrounds/AutoBackground"
import DomainChart from "../components/Dashboard/DomainChart/DomainChart"
import TotalChallenges from "../components/Dashboard/HeroStats/TotalChallenges/TotalChallenges"
import TotalPoints from "../components/Dashboard/HeroStats/TotalPoints/TotalPoints"
import UsedPlatforms from "../components/Dashboard/HeroStats/UsedPlatforms/UsedPlatforms"
import StatsContainer from "../components/Dashboard/StatsContainer/StatsContainer"
import TimelineChart from "../components/Dashboard/TimelineChart/TimelineChart"

function Dashboard(){
    return(
        <AutoBackground>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                
                <StatsContainer>
                    <TotalChallenges />
                </StatsContainer>

                <StatsContainer>
                    <TotalPoints />
                </StatsContainer>

                {/* On tablets, this will move to its own row or share based on span */}
                <StatsContainer>
                    <UsedPlatforms />
                </StatsContainer>

                {/* - Mobile: spans 1 col
                    - Large: spans 2 cols 
                */}
                <div className="md:col-span-2">
                    <StatsContainer>
                        <TimelineChart />
                    </StatsContainer>
                </div>

                {/* On large screens, this fills the 3rd slot next to Timeline */}
                <div className="md:col-span-2 lg:col-span-1">
                    <StatsContainer>
                        <DomainChart />
                    </StatsContainer>
                </div>
                
            </div>
        </AutoBackground>
    )
}

export default Dashboard