const bugs = require("../data/bugs")

//Attempt to delete a bug. If there is an error, send an error
async function deletebug(req, res)
{
    try
    {
        const {projectID, bug_id} = req.body
        
        if(typeof(projectID) === "number" && typeof(bug_id) === "number")
        {    
            await bugs.deleteBug(bug_id, projectID)
            res.send("Bug deleted")
        }
        else
        {
            res.status(500).send()
        }
    }
    catch
    {
        res.status(500).send()
    }
}

module.exports = deletebug