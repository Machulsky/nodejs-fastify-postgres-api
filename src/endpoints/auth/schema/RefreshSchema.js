module.exports.RefreshSchema = {
    tags: ['Auth'],
    description: 'Renew user session by refresh token and returns new access token and refresh token',
    headers: {
        type: 'object',
        required: ['x-refresh-token'],
        properties: {
            'x-refresh-token': {type: 'string', default: 'your refresh token'}
        }
    },

    response: {
        200:{
            type: 'object',
            properties: {
                success: {type: 'boolean', default: true},
                data:{
                    type: 'object',
                    properties:{
                        token: {type: 'string'},
                        refreshToken: {type: 'string'}

                    }
                }
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
