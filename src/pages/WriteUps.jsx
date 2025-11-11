import { useState } from "react"
import Background from "../components/Background"
import Dropdown from "../components/write_ups/Dropdown"
import Search from "../components/write_ups/Search"
import Toolbar from "../components/write_ups/Toolbar"

function WriteUps(){
    const [currentCategory, setCurrentCategory] = useState("")
    const [currentUpload, setCurrentUpload] = useState("")
    const [currentPlatform, setCurrentPlatform] = useState("")
    
    const handleCategoryChange = () => {
        setCurrentCategory(currentCategory)
    }

    const handleUploadChange = () => {
        setCurrentUpload(currentUpload)
    }
    
    const handlePlatformChange = () => {
        setCurrentPlatform(currentPlatform)
    }
    
    return(
        <>
            <Background isEven={false}>
                <Toolbar>
                    <Search />
                    <Dropdown
                        options={["Tech", "Design", "Business"]}
                        handleSelect={handleCategoryChange}
                        message={"Select Category"}
                    />
                    <Dropdown
                        options={["Tech", "Design", "Business"]}
                        handleSelect={handleUploadChange}
                        message={"Upload Time"}
                    />
                    <Dropdown
                        options={["Tech", "Design", "Business"]}
                        handleSelect={handlePlatformChange}
                        message={"Platform"}
                    />
                </Toolbar>
            </Background>
        </>
    )
}

export default WriteUps