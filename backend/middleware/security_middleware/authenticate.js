const users = require("../../data/users")
const bcrypt = require("../../security/bcrypt")
const jwt = require("../../security/jwt")


async function authenticate(req, res)
{
    try
    {
        const {username, password} = req.body

        //Get the users object that needs to be to authenticated
        const userObject = await users.getUserByUsername(username)
        //If the object returned is null, send an error
        if(userObject == null)
        {
            return res.status(500).send()
        }

        //Compare the requests password against the password in the database. If they match, store a generated token
        //in the user's cookies. Also store a username cookie (only used for aesthetic purposes on the client)
        if(await bcrypt.comparePassword(password, userObject.password))
        {
            const token = jwt.createToken(userObject)
            res.cookie("token", token, {httpOnly:true, sameSite:'none', secure:true})
            res.json({username:userObject.username})
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

module.exports = authenticate