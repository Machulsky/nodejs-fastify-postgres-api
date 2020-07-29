module.exports.LoginSchema = {
    tags: ['Platform auth'],
    description: 'Creating user session and returns access token and refresh token',
    body: {
        type: 'object',
        required: ['username', 'password'],
        properties:{
            username: {type: 'string', maxLength: 32, minLength: 3},
            password: {type: 'string', maxLength: 64, minLength: 6}
        }
        
    },

    response: {
        200: {
            
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

        409: {
            type: 'object',
            properties: {
                success: {type: 'boolean', default: false},
                message: {type: 'string'}
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