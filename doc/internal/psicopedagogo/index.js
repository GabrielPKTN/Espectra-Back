const getLogin            = require('./getLogin.js')
const getById             = require('./getById.js')
const post                = require('./post.js')
const put                 = require('./put.js')
const deletePsicopedagogo = require('./delete.js')

module.exports = {
    
    "/v1/espectra/psicopedagogo/": {
        ...post
    },

    "/v1/espectra/psicopedagogo/{id}": {
        ...getById,
        ...put,
        ...deletePsicopedagogo
    },

    "/v1/espectra/psicopedagogo/?email={email}&senha={senha}": {
        ...getLogin
    }

}
