module.exports.Response = {
    async wrongPassword(res){
        return res.status(403).send({
            success: false,
            message: 'Неверный пароль'
        })
    },

    async userNotFound(res){
        return  res.status(409).send({
            success:false,
            message: 'Пользователя не существует'
        })
    },

    async userExist(res){
        return res.status(409).send({
            success:false,
            message: 'Пользователь с таким логином или email уже зарегистрирован'
        })
    },

    async sessionNotFound(res){
        return res.status(409).send({
            success: false,
            message: 'Сессия не найдена'
        })
    },

    async unconfirmedPassword(res){
        return res.status(400).send({
            success: false,
            message: 'Пароли не совпадают'
        })
    },

    async invalidRefreshToken(res){
        return res.status(401).send({
            success: false,
            message: 'Недействительный токен'
        })

    },

    async outdatedRefreshToken(res){
        return res.status(401).send({
            success: false,
            message: 'Недействительный токен'
        })
    },
    

    async ok(res, data){
        return res.status(200).send({
            success: true,
            data: data
        })
    },

    async okWithList(res, data, totalCount){
        return res.status(200).send({
            success: true,
            data: data,
            totalCount: totalCount
        })
    }

}