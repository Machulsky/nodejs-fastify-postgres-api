module.exports.parseForUpdate = (obj) =>{
    let k = Object.keys(obj)
    let v = Object.values(obj)

    let data = { query: "", values: []}

    k.forEach((val, i) => {
        if(v[i+1]){
            data.query+=val+"=$"+[i+1]+","
            
        }else{
            data.query+=val+"=$"+[i+1]
        }
        data.values.push(v[i])
    })

    return data
}