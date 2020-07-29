const fastify = require("fastify")({logger: true})
const dotenv = require("dotenv").config()
const Swagger = require('./swagger-options')
const cors = require('fastify-cors')
const  Fingerprint = require('express-fingerprint')
const helmet = require('fastify-helmet')
fastify.register(
    helmet,
    // Example of passing an option to x-powered-by middleware
    { hidePoweredBy: { setTo: 'PHP 4.2.0' } }
  )
fastify.register(require('fastify-swagger'), Swagger.options);
fastify.register(cors, {})

fastify.register(require('./routes'), {prefix: 'api'})



const run = async () => {
    try{
        await fastify.register(require('fastify-express'))
        fastify.use(Fingerprint({
    parameters:[
        
        Fingerprint.useragent,
        Fingerprint.geoip,
    ]
}))

        await fastify.listen(process.env.PORT || 3000)
        fastify.log.info("Server started")
    }catch(e){
        fastify.log.error(e)
        process.exit(1)

    }
}

run()
