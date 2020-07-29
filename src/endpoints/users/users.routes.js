const { UsersController } = require("./users.controller")
const { GetUsersSchema } = require("./schema/GetUsersSchema")
const { CreateUserSchema } = require("./schema/CreateUserSchema")
const { UpdateUserSchema } = require("./schema/UpdateUserSchema")
const { DeleteUserSchema } = require("./schema/DeleteUserSchema")
const { GetSingleUserSchema } = require("./schema/GetSingleUserSchema")
const { withUserData } = require("../auth/middleware/withUserData")
const { withPermission } = require("../auth/middleware/withPermission")
const { GetUserRolesSchema } = require("./schema/GetUserRolesSchema")
const { GetUserPermissionsSchema } = require("./schema/GetUserPermissionsSchema")
const { withOnlyMy } = require("../auth/middleware/withOnlyMy")


const routes = [
    {
        method: 'GET',
        url: '/',
        schema: GetUsersSchema,
        preHandler: [withUserData, withPermission('users.getAll')],
        handler: UsersController.getAll
    },

    {
        method: 'GET',
        url: '/:id',
        schema: GetSingleUserSchema,
        preHandler: [withUserData, withPermission('users.getSingle')],
        handler: UsersController.getSingle
    },

    {
        method: 'GET',
        url: '/:id/roles',
        schema: GetUserRolesSchema,
        handler: UsersController.GetUserRoles
    },

    {
        method: 'GET',
        url: '/:id/platforms',
        schema: GetUserRolesSchema,
        preHandlers: [withUserData, withOnlyMy],
        handler: UsersController.GetUserPlatforms
    },

    {
        method: 'GET',
        url: '/:id/permissions',
        schema: GetUserPermissionsSchema,
        handler: UsersController.GetUserPermissions
    },

    {
        method: 'POST',
        url: '/',
        schema: CreateUserSchema,
        preHandler: [withUserData, withPermission('users.create')],
        handler: UsersController.create
    },

    {
        method: 'PUT',
        url: '/:id',
        schema: UpdateUserSchema,
        preHandler: [withUserData, withPermission('users.update')],
        handler: UsersController.update
    },

    {
        method: 'DELETE',
        url: '/:id',
        schema: DeleteUserSchema,
        preHandler: [withUserData, withPermission('users.delete')],
        handler: UsersController.delete
    }

]

module.exports = (fastify, opts, next) => {
    routes.forEach((route, index) => {
        fastify.route(route)
    })


    next()
}