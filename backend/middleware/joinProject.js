const projectsusers = require("../data/projectsusers")
const users = require("../data/users")
const jwtDecode = require("jwt-decode")

//Check if the user that wants to join is already in the project.
//If there is an error or the user is in the project, respond with an error
async function joinproject(req, res)
{
    try
    {
        const {token} = req.cookies
        const {projectID} = req.body

        const usersInProject = await projectsusers.getProjectUsersByProjectId(projectID)
    
        const username = jwtDecode(token).username
        const userID = await users.getUserIdByUsername(username)
    
        for(let user of usersInProject)
        {
            if(user.user_id === userID)
            {
                return res.status(500).send()
            }
        }
    
        projectsusers.insertUserIntoProject(projectID, userID)
        res.send("User added to project")
    }
    catch
    {
        res.status(500).send()
    }
}

module.exports = joinproject