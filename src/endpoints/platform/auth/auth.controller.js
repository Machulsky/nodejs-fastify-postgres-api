const { User } = require("./entities/User")
const { checkPassword } = require("./utils/password.utils")
const { Response } = require("./auth.response")
const { createSession, deleteSessionIfExist, generateSessionData } = require("./utils/session.utils")
const { RefreshToken } = require("./entities/RefreshToken")
const { token } = require("./utils/jwt.utils")

module.exports.doLogin = async (req, res) => {
    try{

        const user = await User.exist(req.body.username, req.params.id)
       
        if(!user) return Response.userNotFound(res)

        const role = await User.getRole(user.id)

        if(!role){
            user.roleId = 0
        }else{
            user.roleId = role
        }

        if(!await checkPassword(req.body.password, user.password)) return Response.wrongPassword(res)
        
        await deleteSessionIfExist(req, user)
        
        const data = await createSession(req, user)
    
        return Response.ok(res, data)

    }catch(e){
        throw e
    }

}




module.exports.doRefresh = async (req, res) => {
    try{
        const refreshToken = req.headers['x-refresh-token']

        const session = await generateSessionData(req)
        session.token = refreshToken

        const validToken = await RefreshToken.check(session)

        if(!validToken) return Response.invalidRefreshToken(res)

        if(validToken.expires_in <= Math.floor(Date.now() / 1000)){
                RefreshToken.delete(validToken.id)
                return Response.outdatedRefreshToken(res)
        }

        await RefreshToken.delete(validToken.id)

        const verifiedToken = await token.extract(refreshToken)

        if(!verifiedToken) return Response.invalidRefreshToken(res)

        const data = await createSession(req, {id: verifiedToken._id})
      
        return Response.ok(res, data)

    }catch(e){
        throw e
    }
    
}


module.exports.getMe = async (req, res) => {
    return Response.ok(res, req.user)
}

module.exports.getSession = async (req, res) => {
    try {
        const sessions = await RefreshToken.getListByUserId(req.user.id, req.query.limit || 100, req.query.offset || 0)
        const count = await RefreshToken.getCountByUserId(req.user.id)
        return Response.okWithList(res, sessions, count)
        
    } catch (e) {
        throw e
    }
    
}

module.exports.deleteSession = async (req, res) => {
    const deleteSession = await RefreshToken.deleteIfExist({userID: req.user.id, fingerprint: req.raw.fingerprint.hash})
    if(!deleteSession) return Response.sessionNotFound(res)

    return Response.ok(res, deleteSession)
    
}
