const bugs = require("../data/bugs")
const users = require("../data/users")
const projectUsers = require("../data/projectsusers")

//Checks if the user that the admin wants to change the bug's assignment to
//is even in the project. If they are, then update the bug. Otherwise, respond
//with an error.
async function changebugassigned(req, res)
{
    try
    {
        const {assignTo, projectID, bug_id} = req.body

        const userToAssignID = await users.getUserIdByUsername(assignTo)

        const usersInProject = await projectUsers.getProjectUsersByProjectId(projectID)
        await checkIfUserInProject(userToAssignID, usersInProject)
        await bugs.updateBugAssignedToByUserId(userToAssignID, bug_id)
        res.send("Bug assigned user has been updated")
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

module.exports = changebugassigned