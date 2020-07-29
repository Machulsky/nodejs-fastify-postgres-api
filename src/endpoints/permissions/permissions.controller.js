const { Permission } = require("./entities/Permission")
const { Response } = require("./permissions.response")

module.exports.CreatePermission = async (req, res) => {
    const findPermission = await Permission.findByAction(req.body.action)
    if(findPermission) return res.send({
        success: false,
        data: findPermission})

    const result = await Permission.store(req.body)

    return res.send({
        success: true,
        data: result})
    
}

module.exports.AttachUserToPermission = async (req, res) => {
    const result = await Permission.attachUser(req.body.userId, req.params.id)
    if(! result)  return Response.error(res, 409, 'Связь уже существует')
    return res.send({
        success: true,
        data: result})
}

module.exports.AttachRoleToPermission = async (req, res) => {
    const result = await Permission.attachRole(req.body.roleId, req.params.id)
    if(! result)  return Response.error(res, 409, 'Связь уже существует')
    return res.send({
        success: true,
        data: result})
}

module.exports.DetachRoleFromPermission = async (req, res) => {
    const result = await Permission.detachRole(req.body.roleId, req.params.id)
    if(! result)  return Response.error(res, 409, 'Связи не существует')
    return res.send({
        success: true,
        data: result})
}
module.exports.DetachUserFromPermission = async (req, res) => {
    const result = await Permission.detachUser(req.body.userId, req.params.id)
    if(! result)  return Response.error(res, 409, 'Связи не существует')
    return res.send({
        success: true,
        data: result})
}
module.exports.GetAllPermissions = async (req, res) => {
    const result = await Permission.getAll(req.query.limit || 100, req.query.offset || 0)
    const count = await Permission.getTotalCount()
    
    return Response.okWithList(res, result, count)
}

module.exports.GetSinglePermission = async (req, res) => {
    const result = await Permission.findById(req.params.id)
    if(!result)  return Response.error(res, 409, 'Такого права не существует')
    
    return Response.ok(res, result)
}

module.exports.DeletePermission = async (req, res) => {
    const exist = await Permission.findById(req.params.id)
    
    if(!exist) return Response.error(res, 409, 'Такого права не существует')
    const result = await Permission.delete(req.params.id)
    return Response.ok(res, result)
}

module.exports.UpdatePermission = async (req, res) => {
    const result = await Permission.findById(req.params.id)
    if(!result)  return Response.error(res, 409, 'Такого права не существует')

    const permission = Permission.create(req.params.id, req.body.action, req.body.displayname)

    const update = await Permission.update(permission)
   

    return Response.ok(res, update)
}