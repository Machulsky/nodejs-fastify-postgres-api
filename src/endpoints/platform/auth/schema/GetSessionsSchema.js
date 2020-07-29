module.exports.GetSessionsSchema = {
    tags: ['Platform auth'],
    description: 'Get current user`s sessions',
    headers: {
        type: 'object',
        required: ['x-access-token'],
        properties: {
            'x-access-token': {type: 'string', default: 'your access token'}
        }
    },

    querystring:{
        type: 'object',
        properties:{
            limit: {type: 'integer', default: 100, min: 1},
            offset: {type: 'integer', default: 0, min: 0}
        }
    },

    response: {
        200:{
            type: 'object',
            properties: {
                success: {type: 'boolean'},
                data: {type: 'array'},
                totalCount: {type: 'integer'}
               
            }
        },

        403: {
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