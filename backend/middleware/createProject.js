const jwtDecode = require("jwt-decode")
const projects = require("../data/projects")
const users = require("../data/users")

//Create a new project by gathering the clients token, projectName, and description
//of the project they want to create. If there is an error, send an error status
async function create(req, res)
{
    try
    {
        const { token } = req.cookies
        const {projectName, description} = req.body
        
        const username = jwtDecode(token).username
        const userID = await users.getUserIdByUsername(username)

        await projects.insertProject(userID, projectName, description)
        res.send("Project created successfully")
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send()
    }
}

module.exports = create