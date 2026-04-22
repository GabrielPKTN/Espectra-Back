const getById                 = require('./getById.js')
const getByRegisterNumber     = require('./getByRegisterNumber.js')
const post                    = require('./post.js')
const put                     = require('./put.js')


module.exports = {
    
    "/v1/espectra/paciente/": {
        ...post
    },

    "/v1/espectra/paciente/{id}": {
        ...getById,
        ...put
    },

    "/v1/espectra/paciente/{register_number}": {
        ...getByRegisterNumber
    },

    "/v1/espectra/paciente/?email={email}&senha={senha}": {
        ...getLogin
    }

}
