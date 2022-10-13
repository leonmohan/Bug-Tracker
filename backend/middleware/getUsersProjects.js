const jwtDecode = require("jwt-decode")
const users = require("../data/users")
const projectsusers = require("../data/projectsusers")
const projects = require("../data/projects")

//Get an individual user's projects. If there is an error, respond with an error
async function userProjects(req, res)
{
    try
    {
        const {token} = req.cookies
        const username = jwtDecode(token).username
        const userObject = await users.getUserByUsername(username)
        const userID = userObject.user_id
        const projectsUsersObject = await projectsusers.getProjectUsersProjectIdsByUserId(userID)

        const userProjects = []
        for(let projectUserObject of projectsUsersObject)
        {
            const projectID = projectUserObject.project_id
            const project = await projects.getProjectById(projectID)
            userProjects.push(project)
        }

        for(let project of userProjects)
        {
            const user = await users.getUserById(project.owner_id)
            project.owner = user.username
            delete project.owner_id
        }

        res.json(userProjects)
    }
    catch
    {
        return res.status(500).send()
    }
}

module.exports = userProjects