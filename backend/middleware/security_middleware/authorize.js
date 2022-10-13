const jwt = require("../../security/jwt")

//Verify the token that's stored in the users cookies. If the token is verified, send a JSON response
//that authorizes the user. Otherwise, clear the client's cookies and send a JSON response that
//unathorizes the user.
function authorize(req, res)
{
    try
    {
        const { token } = req.cookies
        jwt.verifyToken(token)
        const isAuth = {"isAuth":true}
        res.json(isAuth)
    }
    catch(err)
    {
        res.clearCookie("token")
        res.clearCookie("username")
        const isAuth = {"isAuth":false}
        res.json(isAuth)
    }
}

module.exports = authorize