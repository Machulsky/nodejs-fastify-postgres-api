module.exports.DetachUserFromPermissionSchema = {
    tags: ['Permissions', 'Users'],
    description: 'Detach user to permission. permissions.applyRole',
    headers: {
        type: 'object',
        required: ['x-access-token'],
        properties: {
            'x-access-token': {type: 'string', default: 'your access token'}
        }
    },
    body:{
        type: 'object',
        required: ['userId'],
        properties:{
            userId: {type: 'integer'}
          
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