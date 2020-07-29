const { Permission } = require("../entities/Permission")

module.exports.withPlatformPermission = (permission) => {

    const perm = permission
    
    return async (req, res, done) => {
        const user = req.user
        const permission = perm
     

        const checkRole = await Permission.checkRole(user.roleId, permission)
        
        if(checkRole.length <= 0 ) return res.status(403).send({
            success: false,
            message: 'Недостаточно прав. Необходимо '+permission
        })
    }

}