const { token } = require("../utils/jwt.utils")
const { Response } = require("../auth.response")
const { User } = require("../entities/User")
const {PlatformAdmin }  = require("../../../auth/entities/User")
const { Platform } = require("../entities/Platform")

module.exports.withPlatformUserData = async (req, res, done) => {
    
    const accessToken = req.headers['x-access-token'] || false

    if(!accessToken) return Response.invalidRefreshToken(res)

    const decoded = await token.extract(accessToken, 'auth')

    if(!decoded) return Response.invalidRefreshToken(res)

    const user = await User.findById(decoded._id, req.params.id)

    if(!user){
        const isPlatformAdmin = await Platform.getByUserId(decoded._id, req.params.id)
        if(!isPlatformAdmin && isPlatformAdmin.length <= 0) return res.status(403).send({
            success: false,
            message: 'Пользователь не найден'
        })
        req.user = isPlatformAdmin
        req.user.isPlatformAdmin = true
        req.user.roleId = decoded.roleId
        
    }else{
        req.user = user
        req.user.roleId = decoded.roleId

    }

    

    //done()

}