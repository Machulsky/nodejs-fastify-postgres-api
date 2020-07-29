module.exports.MeSchema = {
    tags: ['Auth'],
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
                        email: {type: 'string', format: 'email'},
                        password: {type: 'string'},
                        created_at: {type: 'string'},
                        roleId: {type: 'integer'}
                    }
                }
               
            }
        },

    }


}