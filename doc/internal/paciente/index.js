const getById                 = require('./getById.js')
const deletePaciente          = require('./delete.js')
const getByRegisterNumber     = require('./getByRegisterNumber.js')
const post                    = require('./post.js')
const put                     = require('./put.js')


module.exports = {
    
    "/v1/espectra/paciente/": {
        ...post
    },

    "/v1/espectra/paciente/{id}": {
        ...getById,
        ...put,
        ...deletePaciente
    },

    "/v1/espectra/paciente/{register_number}": {
        ...getByRegisterNumber
    },

}
