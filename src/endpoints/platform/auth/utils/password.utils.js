const bcrypt = require('bcryptjs')



module.exports.checkPassword = async (userPassword, hash) => {
    try{
        const result = await bcrypt.compare(userPassword, hash)

        return result
    }catch(e){
        console.error(e)
        throw e
        
    }
}

