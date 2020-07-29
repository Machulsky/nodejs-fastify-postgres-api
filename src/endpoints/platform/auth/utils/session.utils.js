const { RefreshToken } = require("./../entities/RefreshToken")
const { token } = require('./jwt.utils')

module.exports.createSession = async (req, user) => {
    try{
        

        const session = await this.generateSessionData(req)
        session.userID = user.id
       
        const data = await token.getLoginTokens(user.id, user.roleId)

        session.token = data.refreshToken
        session.expiresIn = data.expires.refresh
    
        RefreshToken.store(session)

        return data

    }catch(e){

    }
}

module.exports.generateSessionData = async (req) => {
    const fingerprint = req.raw.fingerprint
    const session = {
        fingerprint: fingerprint.hash,
        browser: fingerprint.components.useragent.browser.family,
        system: fingerprint.components.useragent.os.family,
        ip: req.ip
    }

    return session
}

module.exports.deleteSessionIfExist = async (req, user) => {
    try{
        const fingerprint = req.raw.fingerprint

        const session = await this.generateSessionData(req)
        session.userID = user.id

        await RefreshToken.deleteIfExist(session)

    }catch(e){
        throw e
    }

}