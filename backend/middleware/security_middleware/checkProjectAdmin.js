const jwtDecode = require("jwt-decode")
const projectUsers = require("../../data/projectsusers")
const users = require("../../data/users")

//Verifies that the user is an admin on the project
async function checkprojectadmin(req, res, next)
{
    try
    {
        const { token } = req.cookies
        const { projectID } = req.body

        const username = jwtDecode(token).username
        const userID = await users.getUserIdByUsername(username)
        const admin = await projectUsers.getProjectAdminByProjectID(projectID)

        admin.user_id === userID ? next() : res.status(500).send()
    }
    catch
    {
        res.status(500).send()
    }
}

module.exports = checkprojectadmin