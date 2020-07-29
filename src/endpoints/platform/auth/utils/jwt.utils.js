const jwt = require("jsonwebtoken")
const v4 = require("node-uuid").v4
module.exports.token = {
 

    authSecret: new Buffer(process.env.AUTH_TOKEN_SECRET || "QWRErfdsfwER23354DSAf", 'base64'),

    refreshSecret: new Buffer(process.env.REFRESH_TOKEN_SECRET || "546r5ehyrtuyhytRUYuhegbdsf#$T^$5y", 'base64'),

   
    

    authExpires(){
        return Math.floor(Date.now() / 1000) + +process.env.AUTH_TOKEN_EXPIRES|| "1h"
    },

    refreshExpires(){
        return Math.floor(Date.now() / 1000) + + process.env.REFRESH_TOKEN_EXPIRES || "30d"
    },

    getPayload(userId, roleId, type){
        return type === "auth"? { _id: userId, roleId: roleId, exp: this.authExpires() }:{ _id: userId, roleId: roleId, exp: this.refreshExpires() }
    },

   getOptions(type){
       
        return type === "auth" ? { jwtid: v4()} : { jwtid: v4()}
    },


    async getAuthToken(userId, roleId){
        try{
            let payload = this.getPayload(userId, roleId, "auth")
            let authToken = await jwt.sign(payload, this.authSecret, this.getOptions("auth"))
    
            return authToken

        }catch(e){
            console.log(e)
            throw e
        }
       
        
    },

    async getLoginTokens(userId, roleId){
        let tokens = {
            token: await this.getAuthToken(userId, roleId),
            refreshToken: await this.getRefreshToken(userId, roleId),
            expires: {
                token: parseInt(this.authExpires()),
                refresh: parseInt(this.refreshExpires())
            }
        }

        return tokens
        
    },

    async getRefreshToken(userId, roleId){
        try{
            let payload = this.getPayload(userId, roleId, "refresh")
            let refreshToken = await jwt.sign(payload, this.refreshSecret, this.getOptions("refresh"))
            return refreshToken

        }catch(e){
            throw e
        }
        
    },

    async extract(token, type){
        try{
            if(type === "auth"){
                let result = await jwt.verify(token, this.authSecret)
                return result
            }else{
                let result = await jwt.verify(token, this.refreshSecret)
                return result
            }
        }catch(error){
            return false
        }
        
    },



}