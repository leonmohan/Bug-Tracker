const jwtDecode = require("jwt-decode")
const bugs = require("../data/bugs")
const projectsusers = require("../data/projectsusers")
const users = require("../data/users")

//Get the user's id, project's id, and the role of the user in the project.
//If the user's role is ADMIN, then toggle the bug's completed column
//Otherwise respond with an error.
async function togglebugcomplete(req, res)
{
    try
    {
        const {bug_id} = req.body
        const {token} = req.cookies
        
        const username = jwtDecode(token).username
        const userObject = await users.getUserByUsername(username)
        const userID = userObject.user_id

        const projectObject = await bugs.getBugsProject(bug_id)
        const projectID = projectObject.project_id

        const projectUsersObject = await projectsusers.getProjectUsersRole(userID, projectID)
        const role = projectUsersObject.role

        if(role.toUpperCase() === "ADMIN")
        {
            bugs.toggleBugCompleteById(bug_id)
            res.send("Bug status toggled")
        }
        else
        {
            res.status(500).send()
        }
        }
    catch(err)
    {
        res.status(500).send()
    }
}

module.exports = togglebugcomplete