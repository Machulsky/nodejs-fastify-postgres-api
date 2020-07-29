module.exports.UpdatePlatformSchema = {
    tags: ['Platforms'],
    description: 'Update platform information',

    headers: {
        type: 'object',
        required: ['x-access-token'],
        properties: {
            'x-access-token': {type: 'string', default: 'your access token'}
        }
    },

    body: {
        type: 'object',
        required: ['title'],
        properties: {
            title: {type: 'string', maxLength: 256},
            tag: {type: 'string', maxLength: 256}
            
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