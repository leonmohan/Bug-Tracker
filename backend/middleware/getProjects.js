const projects = require("../data/projects")
const users = require("../data/users")

//Get all projects, then remove sensitive information from the project's object and send the whole object in JSON format.
//Otherwise, if there is an error, respond with an error
async function getProjects(req, res)
{
    try
    {
        const projectsJson = await projects.getProjects()

        for(let project of projectsJson)
        {
            const userObject = await users.getUserById(project.owner_id)
            project.owner = userObject.username
            delete project.owner_id
        }

        res.json(projectsJson)
    }
    catch
    {
        res.status(500).send()
    }
}

module.exports = getProjects