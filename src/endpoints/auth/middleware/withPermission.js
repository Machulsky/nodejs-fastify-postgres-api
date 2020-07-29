const { Permission } = require("../entities/Permission")

module.exports.withPermission = (permission) => {

    const perm = permission
    
    return async (req, res, done) => {
        const user = req.user
        const permission = perm

        const checkUser = await Permission.checkUser(user.id, permission)

        const checkRole = await Permission.checkRole(user.roleId, permission)

        if(checkUser.length <= 0 && checkRole.length <= 0) return res.status(403).send({
            success: false,
            message: 'Недостаточно прав. Необходимо '+permission
        })
    }

}