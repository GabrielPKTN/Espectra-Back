// const getExplore = require('./getExplore.js')

const get       = require('./get.js')
const getLogin  = require('./getLogin.js')
const getById   = require('./getById.js')
const post      = require('./post.js')
const put       = require('./put.js')


module.exports = {
    
    "/v1/espectra/psicopedagogo/": {
        ...get,
        ...post
    },

    "/v1/espectra/psicopedagogo/{id}": {
        ...getById,
        ...put
    },

    "/v1/espectra/psicopedagogo/?email={email}&senha={senha}": {
        ...getLogin
    }

}