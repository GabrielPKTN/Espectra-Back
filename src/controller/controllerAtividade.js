/********************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a 
 * Model de Atividade
 * Data: 16/05/2026
 * Autores: Enzo Carrilho
 * Versão: 1.0
 ********************************************************************************/
const atividadeDAO = require('../model/DAO/atividade.js')
const defaultMessages = require("./module/defaultMessages.js")

// Retorna uma atividade filtrando pelo ID do paciente e ID da habilidade
const getAtividadeByPacienteIDAndAbilidadeID = async function(patientID, abilityID) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(  
            !isNaN(patientID) && Number(patientID) > 0 && patientID != null && patientID != "" &&

            !isNaN(abilityID) && Number(abilityID) > 0 && patientID != null && patientID != ""

        ){
            result = await atividadeDAO.selectAtividadeByPacientetIDAndAbilidadeID(patientID, abilityID)


            if(result == false){

                if(result == 404 || result == null){
                    return MESSAGES.ERROR_NOT_FOUND //404

                }else{

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_REQUEST.message
                    MESSAGES.DEFAULT_HEADER.items       = result
                    
                    return MESSAGES.DEFAULT_HEADER //200

                }

            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
            

        }else{
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
            
        

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
     
}

const postAtividadePortage = async (atividade, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            const validar = validateAtividadePortage(atividade)

            if(!validar) {

                result = await atividadeDAO.postAtividadePortage(atividade)

                if(result) {

                    if (result == 409) {
                        return MESSAGES.ERROR_CONFLICT //409
                    } else if (result == 404) {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    } else if(result == 401){
                        return MESSAGES.ERROR_NON_AUTHORIZED //401
                    } else {

                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items       = result

                        return MESSAGES.DEFAULT_HEADER //201

                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validar //400 
            }

        } else {
            
            return MESSAGES.ERROR_CONTENT_TYPE //415

        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}


const postAtividadePersonalizada = async (atividade, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            const validar = validatePostAtividadePersonalizada(atividade)

            if(!validar) {

                result = await atividadeDAO.postAtividadePersonalizada(atividade)

                if(result) {

                    if (result == 404) {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    } else if(result == 401){
                        return MESSAGES.ERROR_NON_AUTHORIZED //401
                    } else {

                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_CREATED_ITEM.message
                        // MESSAGES.DEFAULT_HEADER.items       = result

                        return MESSAGES.DEFAULT_HEADER //201

                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validar //400 
            }

        } else {
            
            return MESSAGES.ERROR_CONTENT_TYPE //415

        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}



const updateAtividadePersonalizada = async (id, atividade, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if(!isNaN(id) && id > 0 && id != "" && id != null) {

                validar = validateUpdateAtividadePersonalizada(atividade)

                if(!validar) {

                    result = await atividadeDAO.updateAtividadePersonalizada(id, atividade)

                    if(result) {

                        if (result == 404) {
                            return MESSAGES.ERROR_NOT_FOUND //404
                        } else if (result == 401) {
                            return MESSAGES.ERROR_NON_AUTHORIZED
                        } else {
                            
                            MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATE_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items       = result

                            return MESSAGES.DEFAULT_HEADER //200

                        }

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validar //400
                }

            } else {
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// updateAtividadePersonalizada
const updateStatusAtividade = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
    

            if(!isNaN(id) && id > 0 && id != "" && id != null) {

                result = await atividadeDAO.updateStatusAtividade(id)

                if(result) {

                    if (result == 404) {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    } else {
                            
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items       = result

                        return MESSAGES.DEFAULT_HEADER //200

                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }


            } else {
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }


    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}


const deleteAtividade = async (id, dados, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            if(!isNaN(dados.id_paciente) && dados.id_paciente > 0 && dados.id_paciente != "" && dados.id_paciente != null) {

                if(!isNaN(dados.id_usuario) && dados.id_usuario > 0 && dados.id_usuario != "" && dados.id_usuario != null) {

                    result = await atividadeDAO.deleteAtividade(id, dados)

                    if(result) {

                        if(result == 404) {
                            return MESSAGES.ERROR_NOT_FOUND //404
                        } else if(result == 401) {
                            return MESSAGES.ERROR_NON_AUTHORIZED //401
                        } else {

                            MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETE.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE.status_code
                            MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETE.message
                            delete MESSAGES.DEFAULT_HEADER.items

                            return MESSAGES.DEFAULT_HEADER //200

                        }

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_REQUIRED_FIELDS //400
                }

            } else {
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}


const validateAtividadePortage = (atividade) => {
    if(isNaN(atividade.id_usuario) || Number(atividade.id_usuario) <= 0 || atividade.id_usuario == '' || atividade.id_usuario == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID USUARIO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(isNaN(atividade.id_paciente) || Number(atividade.id_paciente) <= 0 || atividade.id_paciente == '' || atividade.id_paciente == null){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID PACIENTE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    
    }else if(isNaN(atividade.id_atividade_portage) || Number(atividade.id_atividade_portage) <= 0 || atividade.id_atividade_portage == '' || atividade.id_atividade_portage == null){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID ATIVIDADE PORTAGE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else {
        return false
    }
}

const validatePostAtividadePersonalizada = (atividade) => {
    if(isNaN(atividade.id_usuario) || Number(atividade.id_usuario) <= 0 || atividade.id_usuario == '' || atividade.id_usuario == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID USUARIO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(isNaN(atividade.id_paciente) || Number(atividade.id_paciente) <= 0 || atividade.id_paciente == '' || atividade.id_paciente == null){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID PACIENTE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    
    } else if(!atividade.comportamento || atividade.comportamento.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [COMPORTAMENTO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(!atividade.valor_meses || atividade.valor_meses < 0){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [VALOR MESES INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(isNaN(atividade.id_habilidade) || Number(atividade.id_habilidade) <= 0 || atividade.id_habilidade == '' || atividade.id_habilidade == null){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID HABILIDADE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    
    } else {
        return false
    }
}

const validateUpdateAtividadePersonalizada = (atividade) => {

    
    if(isNaN(atividade.id_usuario) || Number(atividade.id_usuario) <= 0 || atividade.id_usuario == '' || atividade.id_usuario == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID USUARIO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!atividade.comportamento || atividade.comportamento.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [COMPORTAMENTO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(!atividade.valor_meses || atividade.valor_meses < 0){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [VALOR MESES INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}


module.exports = {
    getAtividadeByPacienteIDAndAbilidadeID,
    postAtividadePortage,
    postAtividadePersonalizada,
    updateAtividadePersonalizada,
    updateStatusAtividade,
    deleteAtividade
}