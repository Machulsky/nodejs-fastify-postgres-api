const { Platform } = require("./entities/Platform")

module.exports.CreatePlatform = async (req, res) => {
    //check tag exists
    const tagExist = await Platform.getByTag(req.body.tag)

    if(tagExist) return res.status(409).send({
        success: false,
        message: 'Платформа с таким тегом уже существует'
    })

    //create new platform
    const newPlatform = await Platform.create(req.body.tag, req.body.title, '{}', req.user.id)
    const createdPlatform = await Platform.store(newPlatform)

    return res.send({
        success: true,
        data: createdPlatform
    })
}

module.exports.UpdatePlatform = async (req, res) => {
    const tagExist = await Platform.getByTag(req.body.tag)

    if(tagExist.length > 0) return res.status(409).send({
        success: false,
        message: 'Тэг уже занят'
    })

    const platform = {...req.body}

    const update = await Platform.update(platform)

    return res.send({
        success: true,
        data: update
    })
}

module.exports.DeletePlatform = async (req, res) => {

    const delPlatform = await Platform.delete(req.params.id)

    if(!delPlatform) return res.status(409).send({
        success: false,
        message: 'Платформы не существует'
    })

    return res.send({
        success: true,
        data: delPlatform
    })


}

module.exports.GetAllPlatforms = async (req, res) => {

    const platforms = await Platform.getAll(req.query.limit || 100, req.query.offset || 0)
    const count = await Platform.getTotalCount()
    return res.send({
        success: true,
        data: platforms,
        totalCount: count
    })
}

module.exports.GetOnePlatformById = async (req, res) => {
    const platform = await Platform.getById(req.params.id)
    
    return res.send({
        success: true,
        data: platform
    })

}

module.exports.GetOnePlatformByTag = async (req, res) => {
 
    const platform = await Platform.getByTag(req.params.tag)

  
    return res.send({
        success: true,
        data: platform
    })
}

