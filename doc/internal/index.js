const reponsavel      = require('./responsavel')
const psicopedagogo   = require('./psicopedagogo')

module.exports = {
    ...psicopedagogo,
    ...responsavel
}