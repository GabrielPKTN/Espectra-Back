const deleteAtividadePersonalizada = require('./delete')
const getAtividadePersonalizada = require('./get')
const postAtividadePersonalizada = require('./post')
const putAtividadePersonalizada = require('./put')

module.exports = {
    "/v1/espectra/atividade_personalizada/": {
        ...getAtividadePersonalizada,
        ...postAtividadePersonalizada
    },

    "/v1/espectra/atividade_personalizada/{id}": {
        ...putAtividadePersonalizada,
        ...deleteAtividadePersonalizada
    }
}