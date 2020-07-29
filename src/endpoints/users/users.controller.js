const { User } = require("./entities/User")
const { Response } = require("./users.response")
const { ApplyRoleToPermission } = require("../permissions/permissions.controller")
const { GetUserRolesSchema } = require("./schema/GetUserRolesSchema")


module.exports.UsersController = {
    async create(req, res){
        const result = await User.store(req.body)
        return Response.okWithArray(res, [result])
    },

    async update(req, res){
        const result = await User.findById(req.params.id)
        if(! result ) return Response.error(res, 409, 'Пользователя не существует')
        if(req.body.password !== req.body.password_confirmation) return Response.unconfirmedPassword(res)
        const user = User.create(req.params.id, req.body.username, req.body.email, req.body.password)
        const update = await User.update(user)
        
        return Response.okWithArray(res, [update])
    },

    async getAll(req, res){
        const result = await User.getAll(req.query.limit || 100, req.query.offset || 0)
        const count = await User.getTotalCount()
        return Response.okWithList(res, result, count)

    },

    async delete(req, res){
        const result = await User.delete(req.params.id)
        if(! result) return Response.error(res, 409, 'Пользователя не существует')
        return Response.ok(res, result)

    },

    async getSingle(req, res){
        const result = await User.findById(req.params.id)
        if(! result) return Response.error(res, 409, 'Пользователя не существует')
        return Response.okWithArray(res, [result])
        
    },

    async GetUserRoles(req, res){
        const result = await User.findRolesByUserId(req.params.id, req.query.limit || 100, req.query.offset || 0)
        if(! result) return Response.error(res, 409, 'Пользователя не существует')
        const count = await User.getRolesCountByUserId(req.params.id)
        return Response.okWithList(res, result, count)

    },

    async GetUserPermissions (req, res){
        const result = await User.getPermissionsByUserId(req.params.id, req.query.limit || 100, req.query.offset || 0)
        if(! result) return Response.error(res, 409, 'Пользователя не существует')
    
        const count = await User.getPermissionsCountByUserId(req.params.id)
    
        return Response.okWithList(res, result, count)

    },

    async GetUserPlatforms (req, res) {
        const result = await User.getPlatforms(req.params.id)
        const count = await User.getPlatformsCount(req.params.id)
        return Response.okWithList(res, result, count)
    }

    
}

