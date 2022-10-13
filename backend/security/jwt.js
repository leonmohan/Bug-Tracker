const jwt = require("jsonwebtoken")

function createToken(user)
{
    const userObject = user
    delete userObject.password
    delete userObject.user_id

    const token = jwt.sign(user, process.env.JWT_SIGN_PASSWORD, {expiresIn: "1h"})
    return token
}

function verifyToken(token)
{
    jwt.verify(token, process.env.JWT_SIGN_PASSWORD)
}

module.exports.createToken = createToken
module.exports.verifyToken = verifyToken