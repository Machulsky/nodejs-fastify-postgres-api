module.exports.MeSchema = {
    tags: ['Platform auth'],
    description: 'Get current user`s data by token',
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
                        username: {type: 'string'},
                        firstname: {type: 'string'},
                        lastname: {type: 'string'},
                        patronym: {type: 'string'},
                        email: {type: 'string', format: 'email'},
                        password: {type: 'string'},
                        created_by: {type: 'integer'},
                        created_at: {type: 'string'},
                        isPlatformAdmin: {type: 'boolean'}
                    }
                }
               
            }
        },

    }


}