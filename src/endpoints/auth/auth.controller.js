const { User } = require("./entities/User")
const { checkPassword } = require("./utils/password.utils")
const { Response } = require("./auth.response")
const { createSession, deleteSessionIfExist, generateSessionData } = require("./utils/session.utils")
const { RefreshToken } = require("./entities/RefreshToken")
const { token } = require("./utils/jwt.utils")

module.exports.doLogin = async (req, res) => {
    try{

        const user = await User.exist(req.body.login)
    
        if(!user) return Response.userNotFound(res)
        user.roleId = await User.getRole(user.id)
       
        if(!await checkPassword(req.body.password, user.password)) return Response.wrongPassword(res)
        
        await deleteSessionIfExist(req, user)
        
        const data = await createSession(req, user)
    
        return Response.ok(res, data)

    }catch(e){
        throw e
    }

}

module.exports.doRegister = async (req, res) => {
    try{
        if( await User.exist(req.body.username) ) return Response.userExist(res)
        if( req.body.password !== req.body.password_confirmation) return Response.unconfirmedPassword(res)

        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        const user = await User.store(newUser)
        
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

        const data = await createSession(req, {id: verifiedToken._id, roleId: verifiedToken.roleId})
      
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
