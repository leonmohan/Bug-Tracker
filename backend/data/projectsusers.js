const client = require("./db")

//Gets only the project_ids that the user is involved in
function getProjectUsersProjectIdsByUserId(userID)
{
    return new Promise((resolve, reject)=>
    {
        client.query(`SELECT project_id FROM ProjectsUsers WHERE user_id = ${userID}`, (err, res)=>
        {
            if(!err)
            {
                resolve(res.rows)
            }
            else
            {
                reject("Could not find projects that the user is involved in")
            }
            client.end
        })
    })
}

//Gets the role of a user from a project: {}
function getProjectUsersRole(userID, projectID)
{
    return new Promise((resolve, reject)=>
    {
        client.query(`SELECT * FROM ProjectsUsers WHERE user_id = ${userID} AND project_id = ${projectID}`, (err, res)=>
        {
            if(!err)
            {
                const project = res.rows[0]
                if(!project)
                {
                    resolve({role:"Guest"})
                }
                else{
                    resolve(project)
                }
            }
            else
            {
                reject("Failed to get users role")
            }
            client.end
        })
    })
}

//Gets all the users involved with a specific project (From the ProjectsUsers join table): [{}, {}, {}]
function getProjectUsersByProjectId(projectID)
{
    return new Promise((resolve, reject)=>
    {
        client.query(`SELECT * FROM ProjectsUsers WHERE project_id = ${projectID}`, (err, res)=>
        {
            if(!err)
            {
                resolve(res.rows)
            }
            else
            {
                reject("Could not find project users")
            }
            client.end
        })
    })
}

//Gets the ProjectUsers record of a project where the user is the admin: {}
function getProjectAdminByProjectID(projectID)
{
    return new Promise((resolve, reject)=>
    {
        client.query(`SELECT * FROM ProjectsUsers WHERE project_id = ${projectID} AND role='admin'`, (err, res)=>
        {
            if(!err)
            {
                resolve(res.rows[0])
            }
            else
            {
                reject("Could not find admin")
            }
            client.end
        })
    })
}

//Inserts user into project
function insertUserIntoProject(projectID, userID)
{
    return new Promise((resolve, reject)=>
    {
        client.query(`INSERT INTO ProjectsUsers (project_id, user_id, role) VALUES (${projectID}, ${userID}, 'developer')`, (err, res)=>
        {
            if(!err)
            {
                resolve("Successfully inserted user into project")
            }
            else
            {
                reject("Failed to insert user")
            }
            client.end
        })
    })
}

module.exports.getProjectUsersProjectIdsByUserId = getProjectUsersProjectIdsByUserId
module.exports.getProjectUsersRole = getProjectUsersRole
module.exports.getProjectUsersByProjectId = getProjectUsersByProjectId
module.exports.getProjectAdminByProjectID = getProjectAdminByProjectID
module.exports.insertUserIntoProject = insertUserIntoProject