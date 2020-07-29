module.exports.Response = {
    
    async error(res, code, message){
        return res.status(code).send({
            success: false,
            message: message
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