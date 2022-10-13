const projectsUsers = require("../data/projectsusers")
const users = require("../data/users")
const jwtDecode = require("jwt-decode")
const projects = require("../data/projects")

async function viewproject(req, res)
{
    try
    {
        const {projectID} = req.params
        const {token} = req.cookies

        //Get the project to view
        const project = await projects.getProjectById(projectID)
        
        //Get the user thats requesting to see this project's user_id. Also get the username of the owner
        const username = jwtDecode(token).username
        const userObject = await users.getUserByUsername(username)
        const userID = userObject.user_id
        const ownerObject = await users.getUserById(project.owner_id)
        const ownerUsername = ownerObject.username

        //Get the role of the user on the project
        const projectUsersObject = await projectsUsers.getProjectUsersRole(userID, projectID)
        const projectRole = projectUsersObject.role

        //Get the users of that project
        const projectUsersObj = await projectsUsers.getProjectUsersByProjectId(projectID)
        const projectUsers = projectUsersObj
        const usernames = []
        for(let project of projectUsers)
        {
            const userObject = await users.getUserById(project.user_id)
            usernames.push(userObject.username)
        }

        //Remove the owner_id, add the role and the username of the owner
        delete project.owner_id
        project.role = projectRole.toUpperCase()
        project.owner = ownerUsername
        project.projectUsers = usernames
        res.json(project)
    }
    catch(err)
    {
        res.status(500).send()
    }
}

module.exports = viewproject