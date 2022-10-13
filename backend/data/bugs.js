const client = require("./db")
const prep = require("pg-prepared")

//Returns an array of bugs from a specific project: [{}, {}, {}]
function getBugsByProjectId(id)
{
    return new Promise((resolve, reject)=>
    {
        client.query(`SELECT * FROM Bugs WHERE project_id = ${id}`, (err, res)=>
        {
            if(!err)
            {   
                resolve(res.rows)
            }
            else
            {
                reject("Failed to get bugs")
            }
            client.end
        })    
    })
}

//Returns an object of a project: {}
function getBugsProject(bugID)
{
    return new Promise((resolve, reject)=>
    {
        client.query(`SELECT project_id FROM Bugs WHERE bug_id = ${bugID}`, (err, res)=>
        {
            if(res.rows[0] === undefined)
            {
                return reject("Could not get bugs project id")
            }

            if(!err)
            {
                const projectID = res.rows[0].project_id
                client.query(`SELECT * FROM Projects WHERE project_id = ${projectID}`, (err, res)=>
                {
                    resolve(res.rows[0])
                })
            }
            else
            {
                reject("Could not get bug's project id")
            }
            client.end
        })
    })
}

//Updates the completed column to the opposite of what it was set to: true -> false
function toggleBugCompleteById(bugID)
{
    return new Promise((resolve, reject)=>
    {
        client.query(`SELECT completed FROM Bugs WHERE bug_id = ${bugID}`, (err, res)=>
        {
            if(!err)
            {
                const completed = res.rows[0].completed
                client.query(`UPDATE Bugs SET completed = ${!completed} WHERE bug_id = ${bugID}`, (err, res)=>
                {
                    if(!err)
                    {
                        resolve("Toggled bug")
                    }
                    else{reject("Failed to toggle bug")}
                })
            }
            else
            {
                reject("Failed to get bug")
            }
            client.end
        })
    })
}

//Updates the user that was assigned to complete the bug
function updateBugAssignedToByUserId(userID, bugID)
{
    return new Promise((resolve, reject)=>
    {
        client.query(`UPDATE Bugs SET user_id = ${userID} WHERE bug_id = ${bugID}`, (err, res)=>
        {
            if(!err)
            {
                resolve("Bug updated")
            }
            else
            {
                reject("Failed to update bug")
            }
            client.end
        })
    })
}

//Inserts a new bug
function insertBug(projectID, title, assignedUserID, description)
{
    return new Promise((resolve, reject)=>
    {
        const insertStatement = prep('INSERT INTO Bugs (project_id, user_id, title, description, completed) VALUES (${projectID}, ${assignedUserID}, ${title}, ${description}, false)')

        client.query(insertStatement({projectID:projectID, assignedUserID:assignedUserID, title:title, description:description}), (err, res)=>
        {
            if(!err)
            {
                resolve("Bug inserted")
            }
            else
            {
                reject("Failed to insert bug")
            }
        })
    })
}

//Deletes a bug
function deleteBug(bugID, projectID)
{
    return new Promise((resolve, reject)=>
    {
        client.query(`DELETE FROM Bugs WHERE project_id=${projectID} AND bug_id = ${bugID}`, (err, res)=>
        {
            if(!err)
            {
                resolve("Bug deleted")
            }
            else
            {
                reject("Failed to delete bug")
            }
            client.end
        })
    })
}


module.exports.getBugsByProjectId = getBugsByProjectId
module.exports.getBugsProject = getBugsProject
module.exports.toggleBugCompleteById = toggleBugCompleteById
module.exports.updateBugAssignedToByUserId = updateBugAssignedToByUserId
module.exports.insertBug = insertBug
module.exports.deleteBug = deleteBug