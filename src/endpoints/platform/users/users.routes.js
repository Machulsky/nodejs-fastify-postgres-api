const { UsersController } = require("./users.controller")
const { GetUsersSchema } = require("./schema/GetUsersSchema")
const { CreateUserSchema } = require("./schema/CreateUserSchema")
const { UpdateUserSchema } = require("./schema/UpdateUserSchema")
const { DeleteUserSchema } = require("./schema/DeleteUserSchema")
const { GetSingleUserSchema } = require("./schema/GetSingleUserSchema")
const { withPlatformUserData } = require("../auth/middleware/withPlatformUserData")
const { withPlatformPermission } = require("../auth/middleware/withPlatformPermission")
const { GetUserRolesSchema } = require("./schema/GetUserRolesSchema")
const { GetUserPermissionsSchema } = require("./schema/GetUserPermissionsSchema")
const { withPlatformData } = require("../auth/middleware/withPlatformData")


const routes = [
    {
        method: 'GET',
        url: '/',
        schema: GetUsersSchema,
        preHandler: [withPlatformData, withPlatformUserData],
        handler: UsersController.getAll
    },

    {
        method: 'GET',
        url: '/:user_id',
        schema: GetSingleUserSchema,
        //preHandler: [withUserData, withPlatformPermission('users.getSingle')],
        handler: UsersController.getSingle
    },

    {
        method: 'GET',
        url: '/:user_id/roles',
        schema: GetUserRolesSchema,
        handler: UsersController.GetUserRoles
    },

    {
        method: 'GET',
        url: '/:user_id/permissions',
        schema: GetUserPermissionsSchema,
        handler: UsersController.GetUserPermissions
    },

    {
        method: 'POST',
        url: '/',
        schema: CreateUserSchema,
        //preHandler: [withUserData, withPlatformPermission('users.create')],
        handler: UsersController.create
    },

    {
        method: 'PUT',
        url: '/:user_id',
        schema: UpdateUserSchema,
        //preHandler: [withUserData, withPlatformPermission('users.update')],
        handler: UsersController.update
    },

    {
        method: 'DELETE',
        url: '/:user_id',
        schema: DeleteUserSchema,
        //preHandler: [withUserData, withPlatformPermission('users.delete')],
        handler: UsersController.delete
    }

]

module.exports = (fastify, opts, next) => {
    routes.forEach((route, index) => {
        fastify.route(route)
    })


    next()
}