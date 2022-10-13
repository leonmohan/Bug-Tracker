const bugs = require("../data/bugs")
const users = require("../data/users")

//Get all bugs from a specific project, then remove sensitive information from the bugs's object and send the whole object in JSON format.
//Otherwise, if there is an error, respond with an error
async function getProjectBugs(req, res)
{
    try
    {
        const {projectID} = req.params
        const projectBugs = await bugs.getBugsByProjectId(projectID)

        for(let bug of projectBugs)
        {
            const assignedToUserObj = await users.getUserById(bug.user_id)
            bug.assignedTo = assignedToUserObj.username
            delete bug.user_id
        }

        res.json(projectBugs)
    }
    catch(err)
    {
        res.status(500).send()
    }
}

module.exports = getProjectBugs