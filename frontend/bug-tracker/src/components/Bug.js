import "../styles/Bug.css"

export default function Bug({bugDetails, projectUsers, role, reload})
{
    const {bug_id, completed, title, assignedTo, description, project_id } = bugDetails

        return(
            <div id={completed ? "bug-complete" : "bug-incomplete"}>
                <h4>{title}</h4>
                
                <div>
                    <p>Assigned to: <b>{assignedTo}</b> 
                    
                    {role === "ADMIN" && <select onChange={selectChange}>
                        <option value="">Change assigned user</option>
                        {projectUsers.map(user => <option>{user}</option>)}
                    </select>
                    
                    } 
                    </p>
                </div>
                
                <p>{description}</p>
                <p>{completed ? "COMPLETE":"INCOMPLETE"}</p>
                {role === "ADMIN" && 
                <div id="bug-buttons">
                <button onClick={deleteBug}>Delete</button>
                <button onClick={toggleBug}>{bugDetails.completed ? "Unmark completed" : "Mark completed"}</button>
                </div>
                }
            </div>
        )   
    
        
        async function toggleBug()
        {
            try
            {
                await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/updateBugComplete", {method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({bug_id:bug_id}), credentials:"include"})
                await reload()
            }
            catch(err)
            {
                console.error(err)
            }
        }
    
        async function selectChange(event)
        {
            try
            {
                const {value} = event.target
                if(value !== "")
                {
                    await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/updateBugAssigned",{method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({projectID:project_id, bug_id:bug_id, assignTo:value}), credentials:"include"})
                    await reload()
                }
            }
            catch(err)
            {
                console.error(err)
            }
        }
    
        async function deleteBug()
        {
            try
            {
                await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/deleteBug",{method:"DELETE", headers:{"Content-Type":"application/json"}, body:JSON.stringify({projectID:project_id, bug_id:bug_id}), credentials:"include"})
                await reload()
            }
            catch(err)
            {
                console.error(err)
            }
        }
}