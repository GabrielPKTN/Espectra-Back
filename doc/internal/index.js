const reponsavel      = require('./responsavel')
const paciente        = require('./paciente')
const psicopedagogo   = require('./psicopedagogo')

module.exports = {
    ...psicopedagogo,
    ...responsavel,
    ...paciente
}