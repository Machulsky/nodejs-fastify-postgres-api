const { doLogin, doRegister, doRefresh, getMe, getSession, deleteSession } = require("./auth.controller");
const { LoginSchema } = require("./schema/LoginSchema");
const { RegisterSchema } = require("./schema/RegisterSchema");
const { RefreshSchema } = require("./schema/RefreshSchema");
const { MeSchema } = require("./schema/MeSchema");
const { GetSessionsSchema } = require("./schema/GetSessionsSchema");
const { DeleteSessionSchema } = require("./schema/DeleteSessionSchema");
const { withUserData } = require("./middleware/withUserData");
const { withPermission } = require("./middleware/withPermission");


const routes = [
    {
        method: 'POST',
        url: '/login',
        schema: LoginSchema,
        handler: doLogin
    },

    {
        method: 'POST',
        url: '/register',
        schema: RegisterSchema,
        handler: doRegister
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
        preHandler: [withUserData, withPermission('session.me')],
        handler: getMe
    },

    {
        method: 'GET',
        url: '/session',
        schema: GetSessionsSchema,
        preHandler: [withUserData, withPermission('session.get')],
        handler: getSession
    },

    {
        method: 'DELETE',
        url: '/session/:id',
        schema: DeleteSessionSchema,
        preHandler: [withUserData, withPermission('session.delete')],
        handler: deleteSession
    }
]

module.exports = (fastify, opts, next) => {
    routes.forEach((route, index) => {
        fastify.route(route)
    })


    next()
}