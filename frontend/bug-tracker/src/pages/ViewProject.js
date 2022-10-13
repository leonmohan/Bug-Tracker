import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../styles/ViewProject.css"
import Bug from "../components/Bug"
import loadingGIF from "../loading.gif"

export default function ViewProject()
{
    const {projectId} = useParams()

    //projectDetailsPage state
    const [projectDetailsPage, setProjectDetailsPage] = useState({
        projectName:"",
        projectDescription:"",
        projectUserRole:"",
        projectUsers:"",
        projectID: projectId,
        createFormDetails:
        {
            assignTo:"",
            title:"",
            description:""
        },
        loading:true
    })

    //Get project on first time loading
    useEffect(()=>{
        getProject()
    }, [])


    //Get information from state
    const {projectID, projectName, projectDescription, projectUserRole, projectUsers, createFormDetails, loading, projectBugs, bugsLoading} = projectDetailsPage

    //Display that information on the page
    return(
        <div id="viewproject-container">
          
            {loading ? <img src={loadingGIF} style={{margin:"auto", width:"100px"}} /> : (
                <div>
                    <div id="viewproject-projectdetails">
                        <div>
                            <h1>{projectName}</h1>
                            <h3>{projectDescription}</h3>
                            <p>Your role: <b>{projectUserRole}</b></p>
                            {projectUserRole === "GUEST" && <button onClick={joinProject}>Join project</button>}
                            {projectUserRole === "ADMIN" && 
                                <div>
                                    <h2>Create a new bug</h2>
                                    <form id="viewproject-form" onSubmit={handleSubmit}>
                                        <select name="assignTo" value={createFormDetails.assignTo} onChange={handleInput}>
                                            <option value="">Select user</option>
                                            {projectUsers}
                                        </select>
                                        <input name="title" value={createFormDetails.title} placeholder="Bug title" onChange={handleInput}/>
                                        <textarea name="description" value={createFormDetails.description} placeholder="Description" onChange={handleInput}/>
                                        <button>Create</button>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>

                    <div id="viewproject-bugs">
                        {projectBugs}
                    </div>
                </div>
            )}
        </div>
    )

    //gets project
    async function getProject()
    {
        const getProjectsResponse = await fetch(`https://bug-tracker-backend-leonmohan.herokuapp.com/viewProjectDetails/${projectDetailsPage.projectID}`, {credentials:"include"})
        const projects = await getProjectsResponse.json()
        const {name, description, role, projectUsers} = projects

        const getBugsResponse = await fetch(`https://bug-tracker-backend-leonmohan.herokuapp.com/getProjectBugs/${projectDetailsPage.projectID}`, {credentials:"include"})
        const bugs = await getBugsResponse.json()
        const bugComponents = bugs.map(bug => <Bug key={bug.bug_id} bugDetails={bug} role={role} projectUsers={projectUsers} reload={reload}/>)

        const userSelectOptions = projectUsers.map(user => <option key={user} value={user}>{user}</option>)

        setProjectDetailsPage({
            ...projectDetailsPage, 
            projectName:name,
            projectDescription:description,
            projectUserRole:role,
            projectUsers:userSelectOptions,
            projectBugs:bugComponents,
            createFormDetails:
            {
                assignTo:"",
                title:"",
                description:""
            },
            loading:false
        })
    }

    //Submits the admin's form where they can create bugs
    async function handleSubmit(e)
    {
        e.preventDefault()

        await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/createBug", {
            method:"POST", 
            headers:{"Content-Type":"application/json"}, 
            body:JSON.stringify(
            {
                projectID:projectID,
                assignToUsername:createFormDetails.assignTo,
                title:createFormDetails.title,
                description:createFormDetails.description
            }),
            credentials:"include"
        })
        reload()
    }

    //Makes sure that the createFormDetails state has the same value as the inputs on the form 
    function handleInput(e)
    {
        const {name, value} = e.target
        setProjectDetailsPage({...projectDetailsPage, createFormDetails:{...createFormDetails, [name]:value}})
    }

    //Event listner for when a guest presses the join project button
    async function joinProject()
    {
        await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/guestJoinProject", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({projectID:projectID}), credentials:"include" })
        reload()
    }

    //Changes the setLoading variable to true. (So it shows a loading sign)
    function reload()
    {
        setProjectDetailsPage({...projectDetailsPage, loading:true})
        getProject()
    }
}