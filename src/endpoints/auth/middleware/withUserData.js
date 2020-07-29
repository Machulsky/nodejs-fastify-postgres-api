const { token } = require("../utils/jwt.utils")
const { Response } = require("../auth.response")
const { User } = require("./../entities/User")

module.exports.withUserData = async (req, res, done) => {
    
    const accessToken = req.headers['x-access-token'] || false

    if(!accessToken) return Response.invalidRefreshToken(res)

    const decoded = await token.extract(accessToken, 'auth')
    
    if(!decoded) return Response.invalidRefreshToken(res)
    
    const user = await User.findById(decoded._id)

    req.user = user
    req.user.roleId = decoded.roleId
    

    //done()

}