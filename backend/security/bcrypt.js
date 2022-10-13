const bcrypt = require('bcrypt')

async function generateHashedPassword(password)
{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

function comparePassword(requestPassword, password)
{
    return bcrypt.compare(requestPassword, password)
}

module.exports.generateHashedPassword = generateHashedPassword
module.exports.comparePassword = comparePassword