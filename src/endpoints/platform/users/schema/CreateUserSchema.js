module.exports.CreateUserSchema = {
    tags: ['Platform users'],
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
        required: ['username', 'firstname', 'lastname', 'password'],
        properties:{
            username: {type: 'string', maxLength: 32, minLength: 3},
            password: {type: 'string', maxLength: 64, minLength: 6},
            firstname: {type: 'string', maxLength: 256, minLength: 3},
            lastname: {type: 'string', maxLength: 256, minLength: 3},
            patronym: {type: 'string', maxLength: 256, minLength: 3},
            
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