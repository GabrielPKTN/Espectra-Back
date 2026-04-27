const postAtividadeTipoPortage =  require('./postAtividadePortage')

module.exports = {
    
    "v1/espectra/atividade_portage/": {
        ...postAtividadeTipoPortage
    }

}