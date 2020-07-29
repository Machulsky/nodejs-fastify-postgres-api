module.exports.GetSinglePermissionSchema = {
    tags: ['Permissions'],
    description: 'Get single permission. permissions.getSingle',
    headers: {
        type: 'object',
        required: ['x-access-token'],
        properties: {
            'x-access-token': {type: 'string', default: 'your access token'}
        }
    },

    

    response: {
        200:{
            type: 'object',
            properties: {
                success: {type: 'boolean'},
                data: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer'},
                        action: {type: 'string'},
                        displayname: {type: 'string'}
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