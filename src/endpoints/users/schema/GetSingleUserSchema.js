module.exports.GetSingleUserSchema = {
    tags: ['Users'],
    description: 'Get one user by id',
    headers: {
        type: 'object',
        required: ['x-access-token'],
        properties: {
            'x-access-token': {type: 'string', default: 'your access token'}
        }
    },

    response:{
        200: {
            type: 'object',
            properties: {
                success: {type: 'boolean'},
                data: {
                    type: 'array',
                    
                },
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