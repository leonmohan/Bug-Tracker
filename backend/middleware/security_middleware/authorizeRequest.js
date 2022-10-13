const jwt = require("../../security/jwt")

//Verify the token that's stored in the users cookies. If the token is verified, load the next middleware.
//Otherwise, clear the client's cookies and respond with an error.
function authorizeRequest(req, res, next)
{
    try
    {
        const { token } = req.cookies
        jwt.verifyToken(token)
        next()
    }
    catch(err)
    {
        res.clearCookie("token")
        res.clearCookie("username")
        res.status(500).send()
    }
}

module.exports = authorizeRequest