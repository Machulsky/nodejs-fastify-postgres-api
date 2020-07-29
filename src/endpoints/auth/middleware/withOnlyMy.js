

module.exports.withOnlyMy = async (req, res, done) => {
    
   if(req.params.id !== req.user.id
   
     || req.user.roleId !== 1
     ) return res.status(403).send({
       success: false,
       message: 'Недостаточно прав'
   })
    

    //done()

}