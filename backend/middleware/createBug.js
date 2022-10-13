const bugs = require("../data/bugs")
const projectUsers = require("../data/projectsusers")
const users = require("../data/users")

//Check if the user that the admin is requesting the bug to be assigned to is in the project
//If this is true, insert the bug. Otherwise, send an error
async function createbug(req, res)
{
    try
    {
        const {projectID, assignToUsername, title, description} = req.body
        const usersInProject = await projectUsers.getProjectUsersByProjectId(projectID)
        const assignToUserID = await users.getUserIdByUsername(assignToUsername)
        await checkIfUserInProject(assignToUserID, usersInProject)
        await bugs.insertBug(projectID, title, assignToUserID, description)
        res.send("Bug inserted")
    }
    catch
    {
        res.status(500).send()
    }
}

function checkIfUserInProject(userID, usersInProject)
{
    return new Promise((resolve, reject)=>
    {
        if(userID.length === 0){ reject("Empty userID inputted")}

        for(let user of usersInProject)
        {
            if(user.user_id === userID)
            {
                resolve(true)
            }
        }

        reject(false)
    })
}

module.exports = createbug