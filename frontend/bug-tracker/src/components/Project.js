import "../styles/Project.css"
import { useNavigate } from "react-router-dom"

export default function Project({isAuth, project})
{
    const redirect = useNavigate()

    function redirectToLogin()
    {
        redirect("/pages/login")
    }

    function redirectToViewProject(id)
    {
        redirect(`/pages/projects/${id}`)
    }

    return(
    <div id="project-container">
        <h3>{project.name}</h3>
        <b><p>{`By: ${project.owner}`}</p></b>
        <p>{project.description}</p>
        {isAuth ? <button onClick={()=>redirectToViewProject(project.project_id)}>View project</button> : <button onClick={redirectToLogin}>Log in to view project</button>}
    </div>)
}