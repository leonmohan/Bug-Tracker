import React, { useState } from "react";
import "../styles/Create.css"
import { useNavigate } from "react-router-dom";

export default function Create()
{
    const [projectName, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    const redirect = useNavigate()

    function handleChange(e)
    {
        const {name , value} = e.target

        if(name === "projectName")
        {
            setProjectName(value)
        }
        else if(name === "description")
        {
            setDescription(value)
        }
    }

    async function onSubmit(e)
    {
        e.preventDefault()
        try
        {
            await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/createProject", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({projectName:projectName, description:description}), credentials:"include"})
            redirect("/pages/home")
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return(
    <div id="create-container">
        <h1>Create a new project</h1>
        <form id="create-form" onSubmit={onSubmit}>
            <input type="text" placeholder="Project name" name="projectName" value={projectName} onChange={handleChange} />
            <textarea type="text" placeholder="Description" name="description" value={description} onChange={handleChange} />

            <button>Create project</button>
        </form>

        <div id="create-preview">
            <b><p>Preview:</p></b>
            <h3>{projectName}</h3>
            <p>{description}</p>
        </div>
    </div>
    )
}