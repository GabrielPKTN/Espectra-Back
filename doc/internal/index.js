const psicopedagogo   = require('./psicopedagogo')
const paciente        = require('./paciente')
const reponsavel      = require('./responsavel')

module.exports = {
    ...psicopedagogo,
    ...paciente,
    ...reponsavel
}