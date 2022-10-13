import React, { useEffect, useState } from "react";
import Project from "../components/Project"
import loadingGIF from "../loading.gif"

export default function Explore({isAuth})
{
    const [explorePageDetails, setExplorePageDetails] = useState({projects:[], loading:true})
    const {projects, loading} = explorePageDetails

    useEffect(()=>{     
        async function getProjects()
        {
            try
            {
                const projects = await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/getProjects")
                const projectsJson = await projects.json()
                const projectComponents = projectsJson.map(project => <Project key={project.project_id} isAuth={isAuth} project={project} />)
                setExplorePageDetails({...explorePageDetails, projects:projectComponents, loading:false})
            }
            catch
            {
                console.error("Could not get projects")
            }
        }

        getProjects()
    }, [])

    return(
    <div>
        <h1>Explore other projects</h1>
        {loading && <img src={loadingGIF} style={{width:"200px"}}/>}
        {projects}
    </div>
    )
}