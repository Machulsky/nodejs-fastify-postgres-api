module.exports.CreateUserSchema = {
    tags: ['Users'],
    description: 'Create new user. Need permission users.create',
    headers: {
        type: 'object',
        required: ['x-access-token'],
        properties: {
            'x-access-token': {type: 'string', default: 'your access token'}
        }
    },
    body:{
        type: 'object',
        required: ['username', 'email', 'password'],
        properties:{
            username: {type: 'string', maxLength: 32, minLength: 3},
            email: {type: 'string', format: 'email'},
            password: {type: 'string', maxLength: 64, minLength: 6}
            
        }
    },

    response: {
        200: {
            type: 'object',
            properties: {
                success: {type: 'boolean'},
                data: {type: 'array'}
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