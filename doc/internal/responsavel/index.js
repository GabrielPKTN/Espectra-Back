const deleteResponsavel    = require('./delete.js')
const getById              = require('./getById.js')
const post                 = require('./post.js')
const put                  = require('./put.js')



module.exports = {
    
    "/v1/espectra/responsavel/": {
        ...post
    },

    "/v1/espectra/responsavel/{id}": {
        ...getById,
        ...put,
    },

    "/v1/espectra/responsavel/{id}/?senha={senha}": {
        ...deleteResponsavel
    }

}