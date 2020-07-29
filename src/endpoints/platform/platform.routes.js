module.exports = (fastify, opts, next) => {
    
    fastify.register(require('./auth/auth.routes'), {prefix: 'auth'})
    fastify.register(require('./users/users.routes'), {prefix: 'users'})
    next()
}