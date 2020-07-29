module.exports.RegisterSchema = {
    tags: ['Platform auth'],
    description: 'Register new user and returns access token and refresh token',
    body: {
        type: 'object',
        required: ['username', 'email', 'password', 'password_confirmation'],
        properties:{
            username: {type: 'string', maxLength: 32, minLength: 3},
            email: {type: 'string', format: 'email'},
            password: {type: 'string', maxLength: 64, minLength: 6},
            password_confirmation: {type: 'string', maxLength: 64, minLength: 6}
        }
        
    },
    response:{
        200:{
            type: 'object',
            properties: {
                success: {type: 'boolean'},
                data:{
                    type: 'object',
                    properties:{
                        token: {type: 'string'},
                        refreshToken: {type: 'string'}

                    }
                }
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