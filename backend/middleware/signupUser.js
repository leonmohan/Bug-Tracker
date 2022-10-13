const bcrypt = require("../security/bcrypt")
const users = require("../data/users")

//Generate a hashed password using bcrypt, then insert that user into the database with the hashed password
//If there are any errors, respond with an error.
async function signup(req, res)
{
    try
    {
        const {username, password} = req.body
        if(username === undefined || password === undefined || username.includes(" ") || username === "")
        {
            return res.status(500).send()
        }

        const hashedPassword = await bcrypt.generateHashedPassword(password)
        await users.insertUser(username, hashedPassword)
        res.send("Registration successful")
    }
    catch(err)
    {
        res.status(500).send()
    }
}

module.exports = signup