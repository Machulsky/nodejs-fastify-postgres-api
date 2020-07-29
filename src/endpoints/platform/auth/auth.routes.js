const { doLogin, doRegister, doRefresh, getMe, getSession, deleteSession } = require("./auth.controller");
const { LoginSchema } = require("./schema/LoginSchema");
const { RegisterSchema } = require("./schema/RegisterSchema");
const { RefreshSchema } = require("./schema/RefreshSchema");
const { MeSchema } = require("./schema/MeSchema");
const { GetSessionsSchema } = require("./schema/GetSessionsSchema");
const { DeleteSessionSchema } = require("./schema/DeleteSessionSchema");
const { withPlatformUserData } = require("./middleware/withPlatformUserData");
const { withPlatformPermission } = require("./middleware/withPlatformPermission");


const routes = [
    {
        method: 'POST',
        url: '/login',
        schema: LoginSchema,
        handler: doLogin
    },

  

    {
        method: 'POST',
        url: '/refresh',
        schema: RefreshSchema,
        handler: doRefresh
    },

    {
        method: 'GET',
        url: '/me',
        schema: MeSchema,
        preHandler: [withPlatformUserData, withPlatformPermission('session.me')],
        handler: getMe
    },

    {
        method: 'GET',
        url: '/session',
        schema: GetSessionsSchema,
        preHandler: [withPlatformUserData, withPlatformPermission('session.get')],
        handler: getSession
    },

    {
        method: 'DELETE',
        url: '/session/:session_id',
        schema: DeleteSessionSchema,
        preHandler: [withPlatformUserData, withPlatformPermission('session.delete')],
        handler: deleteSession
    }
]

module.exports = (fastify, opts, next) => {
    routes.forEach((route, index) => {
        fastify.route(route)
    })


    next()
}