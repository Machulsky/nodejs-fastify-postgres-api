const { CreateRole, GetAllRoles, GetSingleRole, GetSingleRolePermissions, AttachUserToRole, DetachUserFromRole, UpdateRole } = require("./roles.controller")
const { GetRolesSchema } = require("./schema/GetRolesSchema")
const { GetSingleRoleSchema } = require("./schema/GetSingleRoleSchema")
const { CreateRoleSchema } = require("./schema/CreateRoleSchema")
const { GetRolePermissionsSchema } = require("./schema/GetRolePermissionsSchema")
const { AttachUserToRoleSchema } = require("./schema/AttachUserToRoleSchema")
const { DetachUserFromRoleSchema } = require("./schema/DetachUserFromRoleSchema")
const { withUserData } = require("../auth/middleware/withUserData")
const { withPermission } = require("../auth/middleware/withPermission")
const { UpdateRoleSchema } = require("./schema/UpdateRoleSchema")
const { DeleteRoleSchema } = require("./schema/DeleteRoleSchema")

const routes = [
    {
        method: 'GET',
        url: '/',
        schema: GetRolesSchema,
        preHandler: [withUserData, withPermission('roles.getAll')],
        handler: GetAllRoles
    },

    {
        method: 'GET',
        url: '/:id',
        schema: GetSingleRoleSchema,
        preHandler: [withUserData, withPermission('roles.getSingle')],
        handler: GetSingleRole
    },

    {
        method: 'GET',
        url: '/:id/permissions',
        schema: GetRolePermissionsSchema,
        preHandler: [withUserData, withPermission('roles.getSinglePermissions')],
        handler: GetSingleRolePermissions
    },

    {
        method: 'POST',
        url: '/:id/attachUser',
        schema: AttachUserToRoleSchema,
        preHandler: [withUserData, withPermission('roles.attachUser')],
        handler: AttachUserToRole
    },

    {
        method: 'POST',
        url: '/:id/detachUser',
        schema: DetachUserFromRoleSchema,
        preHandler: [withUserData, withPermission('roles.detachUser')],
        handler: DetachUserFromRole
    },

    {
        method: 'POST',
        url: '/',
        schema: CreateRoleSchema,
        preHandler: [withUserData, withPermission('roles.create')],
        handler: CreateRole
    },

    {
        method: 'PUT',
        url: '/:id',
        schema: UpdateRoleSchema,
        handler: UpdateRole
    },

    {
        method: 'DELETE',
        url: '/:id',
        schema: DeleteRoleSchema,
        handler: (req, res) => {}
    }

]

module.exports = (fastify, opts, next) => {
    routes.forEach((route, index) => {
        fastify.route(route)
    })


    next()
}