const { CreatePermissionSchema } = require("./schema/CreatePermissionSchema")
const { CreatePermission, ApplyUserToPermission, ApplyRoleToPermission, UpdatePermission, GetAllPermissions, DeletePermission, GetSinglePermission, AttachUserToPermission, AttachRoleToPermission, DetachRoleFromPermission, DetachUserFromPermission } = require("./permissions.controller")
const { ApplyUserToPermissionSchema, AttachUserToPermissionSchema } = require("./schema/AttachUserToPermissionSchema")
const {withUserData } = require("../auth/middleware/withUserData")
const {withPermission } = require("../auth/middleware/withPermission")
const { ApplyRoleToPermissionSchema, AttachRoleToPermissionSchema } = require("./schema/AttachRoleToPermissionSchema")
const { UpdatePermissionSchema } = require("./schema/UpdatePermissionSchema")
const { GetAllPermissionsSchema } = require("./schema/GetAllPermissionsSchema")
const { DeletePermissionSchema } = require("./schema/DeletePermissionSchema")
const { GetSinglePermissionSchema } = require("./schema/GetSinglePermissionSchema")
const { DetachRoleFromPermissionSchema } = require("./schema/DetachRoleFromPermissionSchema")
const { DetachUserFromPermissionSchema } = require("./schema/DetachUserFromPermissionSchema")
const routes = [
    {
        method: 'GET',
        url: '/',
        schema: GetAllPermissionsSchema,
        preHandler:  [ withUserData, withPermission('permissions.getAll') ],
        handler: GetAllPermissions
    },

    {
        method: 'GET',
        url: '/:id',
        schema: GetSinglePermissionSchema,
        preHandler:  [ withUserData, withPermission('permissions.getSingle') ],
        handler: GetSinglePermission
    },

    {
        method: 'POST',
        url: '/',
        schema: CreatePermissionSchema,
        preHandler: [ withUserData, withPermission('permissions.create') ],
        handler: CreatePermission
    },

    {
        method: 'PUT',
        url: '/:id',
        schema: UpdatePermissionSchema,
        preHandler: [ withUserData, withPermission('permissions.update') ],
        handler: UpdatePermission
    },

    {
        method: 'DELETE',
        url: '/:id',
        schema: DeletePermissionSchema,
        preHandler: [ withUserData, withPermission('permissions.delete') ],
        handler: DeletePermission
    },

    {
        method: 'POST',
        url: '/:id/attachUser',
        schema: AttachUserToPermissionSchema,
        preHandler: [withUserData, withPermission('permissions.attachUser')],
        handler: AttachUserToPermission
    },

    {
        method: 'POST',
        url: '/:id/attachRole',
        schema: AttachRoleToPermissionSchema,
        preHandler: [withUserData, withPermission('permissions.attachRole')],
        handler: AttachRoleToPermission
    },

    {
        method: 'POST',
        url: '/:id/detachRole',
        schema: DetachRoleFromPermissionSchema,
        preHandler: [withUserData, withPermission('permissions.detachRole')],
        handler: DetachRoleFromPermission
    },

    {
        method: 'POST',
        url: '/:id/detachUser',
        schema: DetachUserFromPermissionSchema,
        preHandler: [withUserData, withPermission('permissions.detachUser')],
        handler: DetachUserFromPermission
    }
]

module.exports = (fastify, opts, next) => {
    routes.forEach((route, index) => {
        fastify.route(route)
    })


    next()
}