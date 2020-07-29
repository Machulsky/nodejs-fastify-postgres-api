module.exports.Response = {
    

    async userExist(res){
        return res.status(409).send({
            success:false,
            message: 'Пользователь с таким логином или email уже зарегистрирован'
        })
    },

    async error(res, code, message){
        return res.status(code).send({
            success: false,
            message: message
        })
    },

    async unconfirmedPassword(res){
        return res.status(400).send({
            success: false,
            message: 'Пароли не совпадают'
        })
    },
    

    async ok(res, data){
        return res.status(200).send({
            success: true,
            data: data
        })
    },

    async okWithArray(res, data){
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