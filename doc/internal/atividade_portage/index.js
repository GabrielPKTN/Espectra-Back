const getAtividadePortage = require('./get')
const postAtividadePortage = require('./post')

module.exports = {
    "/v1/espectra/atividade_portage": {
        ...getAtividadePortage,
        ...postAtividadePortage
    }
}