module.exports.UpdateRoleSchema = {
    tags: ['Roles'],
    description: 'Update role fields',
    headers: {
        type: 'object',
        required: ['x-access-token'],
        properties: {
            'x-access-token': {type: 'string', default: 'your access token'}
        }
    },

    body:{
        type: 'object',
        required: ['tag', 'displayname'],
        properties:{
            
            tag: {type: 'string', maxLength: 32, minLength: 3},
            displayname: {type: 'string', maxLength: 128, minLength: 3}
            

            
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

        500: {
            type: 'object',
            properties: {
                success: {type: 'boolean', default: false},
                message: {type: 'string'}
            }
        }
    }

}