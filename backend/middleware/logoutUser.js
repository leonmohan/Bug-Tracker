//Clears users cookies and logs them out
function logout(req, res)
{
    res.clearCookie("token", {sameSite:'none', secure:true})
    res.send("Logged user out")
}

module.exports = logout