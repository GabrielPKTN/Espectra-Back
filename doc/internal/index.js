const psicopedagogo   = require('./psicopedagogo')
const paciente        = require('./paciente')
const reponsavel      = require('./responsavel')
const tentativa       = require('./tentativa')

module.exports = {
    ...psicopedagogo,
    ...paciente,
    ...reponsavel,
    ...tentativa
}