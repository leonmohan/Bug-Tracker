const client = require("./db")
const prep = require("pg-prepared")

//Inserts the project, then creates the admin role of the owner
function insertProject(userID, name, description)
{
    return new Promise((resolve, reject)=>
    {
        const insertStatement = prep("INSERT INTO Projects (owner_id, name, description, created_at) VALUES (${owner_id}, ${name}, ${description}, ${created_at})")

        client.query(insertStatement({owner_id:userID, name:name, description:description, created_at:"now()"}), (err, res)=>
        {
            if(!err)
            {
                client.query(`SELECT project_id FROM Projects WHERE created_at = (SELECT MAX(created_at) FROM Projects WHERE owner_id = ${userID})`, (err, res)=>
                {
                    if(!err)
                    {
                        const projectID = res.rows[0].project_id
                        client.query(`INSERT INTO ProjectsUsers ("project_id", "user_id", "role") VALUES (${projectID}, ${userID}, 'admin')`, (err, res)=>
                        {
                            err ? reject("Could not create admin role") : resolve("Created admin role")    
                        })
            
                    }
                    else{reject("Could not find recently created project")}
                })
            }
            else
            {
                console.log(err) 
                reject("Failed to insert project") 
            }

            client.end
        })
    })
}

//Gets all the projects: [{},{},{}]
function getProjects()
{
    return new Promise((resolve, reject)=>{
        client.query(`SELECT * FROM Projects`, (err, res)=>{
            if(!err)
            {
                let projects = res.rows
                resolve(projects)
            }
            else
            {
                reject(err.message)
            }
            client.end
        })
    })
}

//Gets a project by its id: {}
function getProjectById(projectID)
{
    return new Promise((resolve, reject)=>
    {
        client.query(`SELECT * FROM Projects WHERE project_id = ${projectID}`, (err, res)=>
        {
            if(!err)
            {
                const project = res.rows[0]
                resolve(project)
            }
            else
            {
                reject("Could not find Project")
            }
            client.end
        })
    })
}

module.exports.getProjects = getProjects
module.exports.insertProject = insertProject
module.exports.getProjectById = getProjectById