const { GetAllPlatforms, GetOnePlatformByTag, GetOnePlatformById, CreatePlatform, RegisterPlatform, UpdatePlatform, DeletePlatform } = require("./platforms.controller")
const { CreatePlatformSchema } = require("./schema/CreatePlatformSchema")
const { UpdatePlatformSchema } = require("./schema/UpdatePlatformSchema")
const { GetOnePlatformSchema } = require("./schema/GetOnePlatformSchema")
const { GetAllPlatformsSchema } = require("./schema/GetAllPlatformsSchema")
const { DeletePlatformSchema } = require("./schema/DeletePlatformSchema")
const { withUserData } = require("../auth/middleware/withUserData")

const routes = [
    {
        method: 'GET',
        url: '/',
        schema: GetAllPlatformsSchema,
        handler: GetAllPlatforms
        
    },

    {
        method: 'GET',
        url: '/:tag/check',
        schema: GetOnePlatformSchema,
        handler: GetOnePlatformByTag
    },

    {
        method: 'GET',
        url: '/:id',
        schema: GetOnePlatformSchema,
        handler: GetOnePlatformById
    },

    {
        method: 'POST',
        url: '/',
        schema: CreatePlatformSchema,
        preHandler: [withUserData],
        handler: CreatePlatform
    },

    {
        method: 'PUT',
        url: '/:id',
        schema: UpdatePlatformSchema,
        handler: UpdatePlatform
    },
    {
        method: 'DELETE',
        url: '/:id',
        schema: DeletePlatformSchema,
        handler: DeletePlatform
    },

    {
        method: 'DELETE',
        url: '/:id/soft',
        schema: DeletePlatformSchema,
        handler: DeletePlatform
    }
]


module.exports = (fastify, opts, next) => {
    routes.forEach((route, index) => {
        fastify.route(route)
    })


    next()
}