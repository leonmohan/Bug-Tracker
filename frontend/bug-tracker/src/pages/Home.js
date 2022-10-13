import getUsername from "../middleware/getUsernameCookie"
import {useState, useEffect} from "react"
import Project from "../components/Project"
import loadingGIF from "../loading.gif"

export default function Home({isAuth})
{
    const [homePageDetails, setHomePageDetails] = useState({userProjects:[], loading:true})
    
    useEffect(()=>{     
        async function getUserProjects()
        {
            try
            {
                const projects = await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/getUsersProjects", {credentials:"include"})
                const projectsJson = await projects.json()
                const userProjectsComponents = await projectsJson.map(project => <Project key={project.project_id} isAuth={isAuth} project={project} />)
                setHomePageDetails({...homePageDetails, userProjects:userProjectsComponents, loading:false})
            }
            catch
            {

            }
        }
        getUserProjects()
    }, [])

    return(
        <div>
            <h1>{getUsername()}</h1>
            <h3>Your projects:</h3>
            {homePageDetails.loading && <img src={loadingGIF} style={{width:"200px"}}/>}
            {homePageDetails.userProjects}
        </div>
    )
}