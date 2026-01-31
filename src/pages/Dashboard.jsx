import AutoBackground from "../components/Backgrounds/AutoBackground"
import DomainChart from "../components/Dashboard/DomainChart/DomainChart"
import TotalChallenges from "../components/Dashboard/HeroStats/TotalChallenges/TotalChallenges"
import TotalPoints from "../components/Dashboard/HeroStats/TotalPoints/TotalPoints"
import UsedPlatforms from "../components/Dashboard/HeroStats/UsedPlatforms/UsedPlatforms"
import StatsContainer from "../components/Dashboard/StatsContainer/StatsContainer"
import TimelineChart from "../components/Dashboard/TimelineChart/TimelineChart"

// Dashboard page with stats and charts
function Dashboard(){
    return(
        <AutoBackground>
            {/* Grid of stat cards and charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {/* Total challenges stat */}
                <StatsContainer>
                    <TotalChallenges />
                </StatsContainer>

                {/* Total points stat */}
                <StatsContainer>
                    <TotalPoints />
                </StatsContainer>

                {/* Used platforms stat */}
                <StatsContainer>
                    <UsedPlatforms />
                </StatsContainer>

                {/* Timeline chart (spans 2 cols on medium screens) */}
                <div className="md:col-span-2">
                    <StatsContainer>
                        <TimelineChart />
                    </StatsContainer>
                </div>

                {/* Domain chart (spans 1 col on large screens) */}
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