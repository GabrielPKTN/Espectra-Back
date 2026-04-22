const psicopedagogo   = require('./psicopedagogo/index.js')
const paciente = require('./paciente')
// const reponsavel      = require('./responsavel')

module.exports = {
    ...psicopedagogo,
    ...paciente
    // ...reponsavel
}