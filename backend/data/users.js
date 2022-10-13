const client = require("./db")
const prep = require("pg-prepared")

//Inserts new user
function insertUser(username, password)
{
  return new Promise((resolve, reject)=>
  {
    if(username === null || password === null){return reject("Username or password inputted was empty")}

    const selectStatement = prep("SELECT * FROM Users WHERE username= ${username}")

    client.query(selectStatement({username:username}), (err, res)=>{
      if(res.rowCount > 0 || err)
      {
        reject("Failed to insert user")
      }
      else
      {
        const insertStatement = prep("INSERT INTO Users (username, password) VALUES (${username}, ${password})")
        client.query(insertStatement({username:username, password:password}), (err, res)=>
        {
          if(!err)
          {
            resolve("User inserted") 
          }
          else
          {
            reject("Failed to insert user")
          }
        })
      }

      client.end
    })
  })
}

//Gets users object by username: {}
function getUserByUsername(username)
{
  return new Promise((resolve, reject)=>
  {
    if(username === null){ return reject("Empty username inputted") }

    const selectStatement = prep("SELECT * FROM Users WHERE username = ${username}")
    client.query(selectStatement({username:username}), (err, res)=>
    {
      if(!err)
      {
        resolve(res.rows[0])
      }
      else
      {
        reject("Could not get the user")
      }
      client.end
    })
  })
}

//Gets the users object by id
function getUserById(id)
{
  return new Promise((resolve, reject)=>
  {
    if(id === null){ return reject("Empty id inputted") }

    client.query(`SELECT * FROM Users WHERE user_id = '${id}'`, (err, res)=>
    {
      if(!err)
      {
        const userObject = res.rows[0]
        resolve(userObject)
      }
      else
      {
        reject(err.message)
      }
      client.end
    })
  })
}

//Gets the users id by username
function getUserIdByUsername(username)
{
  return new Promise((resolve, reject)=>
  {
    if(username === null){ return reject("Empty username inputted") }

    const selectStatement = prep("SELECT user_id FROM Users WHERE username= ${username}")

    client.query(selectStatement({username:username}), (err, res)=>
    {
      if(res.rows[0] === undefined){ return reject("User id could not be found") }

      if(!err)
      {
        resolve(res.rows[0].user_id)
      }
      else
      {
        return reject("Could not find user_id")
      }
      client.end
    })
  })
}

module.exports.insertUser = insertUser
module.exports.getUserByUsername = getUserByUsername
module.exports.getUserById = getUserById
module.exports.getUserIdByUsername = getUserIdByUsername