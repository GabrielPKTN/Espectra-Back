const psicopedagogo   = require('./psicopedagogo/index.js')
const paciente        = require('./paciente')
const responsavel     = require('./responsavel')

module.exports = {
    ...psicopedagogo,
    ...paciente,
    ...responsavel
}