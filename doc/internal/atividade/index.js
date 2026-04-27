const postAtividadeTipoPortage =  require('./postAtividadePortage')
const postAtividadeTipoPersonalizada = require('./postAtividadePersonalizada')

module.exports = {
    
    "v1/espectra/atividade_portage/": {
        ...postAtividadeTipoPortage
    },

    "v1/espectra/atividade_personalizada/": {
        ...postAtividadeTipoPersonalizada
    }

}