const { Role } = require("./entities/Role")
const { Response } = require("./roles.response")
const { Permission } = require("./entities/Permission")

module.exports.mock = async (req, res) => {
    
} 

module.exports.CreateRole = async (req, res) => {
    const role = req.body

    const createRole = await Role.store(role)

    if(! createRole) return res.status(409).send({
        success: false,
        message: 'Ошибка при создании роли'
    })

    return Response.okWithArray(res, [createRole])
}

module.exports.GetAllRoles = async (req, res) => {
    const result = await Role.getAll(req.query.limit || 100, req.query.offset || 0)
    const count = await Role.getTotalCount()
    
    return Response.okWithList(res, result, count)
}

module.exports.GetSingleRole = async (req, res) => {
    const result = await Role.findById(req.params.id)
    if(!result)  return Response.error(res, 409, 'Такого права не существует')
    
    return Response.okWithArray(res, [result])
}

module.exports.GetSingleRolePermissions = async (req, res) => {
    const result = await Role.findPermissionsById(req.params.id, req.query.limit || 100, req.query.offset || 0)
    if(!result)  return Response.error(res, 409, 'Такого права не существует')
    const count = await Permission.getCountByRoleId(req.params.id)
  
    return Response.okWithList(res, result, count)
}

module.exports.AttachUserToRole = async (req, res) => {
    const result = await Role.attachUser(req.body.userId, req.params.id)
    if(! result)  return Response.error(res, 409, 'Связь уже существует')
    return res.send({
        success: true,
        data: result})
}

module.exports.DetachUserFromRole = async (req, res) => {
    const result = await Role.detachUser(req.body.userId, req.params.id)
    if(! result)  return Response.error(res, 409, 'Связи не существует')
    return res.send({
        success: true,
        data: result})
}

module.exports.UpdateRole = async (req, res) => {
  
    
    const updateRole = Role.create(req.params.id, req.body.tag, req.body.displayname)

    const update = await Role.update(updateRole)
    if(! update) return Response.error(res, 409, 'Роли не существует')
    return Response.okWithArray(res, [update])
}

module.exports.DeleteRole = async (req, res) => {
    const result = await Role.delete(req.params.id)
    if(! result) return Response.error(res, 409, 'Пользователя не существует')
    return Response.ok(res, result)
}
