const psicopedagogo   = require('./psicopedagogo')
const paciente        = require('./paciente')
const reponsavel      = require('./responsavel')
const atividade_personalizada = require('./atividade_personalizada')

module.exports = {
    ...psicopedagogo,
    ...paciente,
    ...reponsavel,
    ...atividade_personalizada
}