

module.exports = (fastify, opts, next) => {
    fastify.register(require('./endpoints/auth/auth.routes'), {prefix: 'auth'})
    fastify.register(require('./endpoints/users/users.routes'), {prefix: 'users'})
    fastify.register(require('./endpoints/roles/roles.routes'), {prefix: 'roles'})
    fastify.register(require('./endpoints/permissions/permissions.routes'), {prefix: 'permissions'})
    fastify.register(require('./endpoints/platforms/platforms.routes'), {prefix: 'platforms'})
    fastify.register(require('./endpoints/platform/platform.routes'), {prefix: 'platform/:id'})
    next()
}