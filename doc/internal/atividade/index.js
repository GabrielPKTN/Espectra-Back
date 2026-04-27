const postAtividadeTipoPortage =  require('./postAtividadePortage')
const postAtividadeTipoPersonalizada = require('./postAtividadePersonalizada')
const deleteAtividadeTipoPersonalizada = require('./deleteAtividadeTipoPersonalizada')

module.exports = {
    
    "v1/espectra/atividade_portage/": {
        ...postAtividadeTipoPortage
    },

    "v1/espectra/atividade_personalizada/": {
        ...postAtividadeTipoPersonalizada
    },

    "v1/espectra/atividade_personalizada/{id_atividade_personalizada}": {
        ...deleteAtividadeTipoPersonalizada
    },


}