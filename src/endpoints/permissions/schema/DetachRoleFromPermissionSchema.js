module.exports.DetachRoleFromPermissionSchema = {
    tags: ['Permissions', 'Roles'],
    description: 'Detach role to permission. permissions.applyRole',
    headers: {
        type: 'object',
        required: ['x-access-token'],
        properties: {
            'x-access-token': {type: 'string', default: 'your access token'}
        }
    },
    body:{
        type: 'object',
        required: ['roleId'],
        properties:{
            roleId: {type: 'integer'}
          
        }
    },

    response: {
        200: {
            type: 'object',
            properties: {
                success: {type: 'boolean'},
                data: {
                    type: 'object',
                    properties: {
                        permission_id: {type: 'integer'},

                    }
                }
            }
        },

        403:{
            type: 'object',
            properties: {
                success: {type: 'boolean', default: false},
                message: {type: 'string'}
            }
        },

        409:{
            type: 'object',
            properties: {
                success: {type: 'boolean', default: false},
                message: {type: 'string'}
            }
        },

        500: {
            type: 'object',
            properties: {
                success: {type: 'boolean', default: false},
                message: {type: 'string'}
            }
        }
    }
}