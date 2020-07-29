const { Platform } = require("../entities/Platform")



module.exports.withPlatformData = async (req, res, done) => {
    
    const platformId = req.headers['x-platform-id'] || false

    if(!platformId) return res.status(403).send({
        success: false,
        message: 'Не указан идентификатор платформы'
    })

    const platform = await Platform.findById(platformId)
    if(!platform) return res.status(403).send({
        success: false,
        message: 'Платформы не существует'
    })

    if(platform.length <= 0) return res.status(403).send({
        success: false,
        message: 'Платформы не существует'
    })

    req.platform = platform

    //done()

}