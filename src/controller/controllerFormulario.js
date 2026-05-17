/********************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model do Formulário
 * Data: 06/05/2026
 * Autores: Nicolas dos Santos
 * Versão: 1.0
 ********************************************************************************/

const formularioDAO = require("../model/DAO/formulario.js")
const defaultMessages = require("./module/defaultMessages.js")

//getFormByIdPaciente
const getFormByIdPaciente = async (id_usuario, id_paciente) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        id_usuario = Number(id_usuario)
        id_paciente = Number(id_paciente)

        if(Number.isInteger(id_usuario) && id_usuario > 0) {

            if(Number.isInteger(id_paciente) && id_usuario > 0) {

                result = await formularioDAO.getFormByIdPaciente(id_usuario, id_paciente)

                if(result) {

                    if (result.status_code == 200) {
                        
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_REQUEST.message
                        MESSAGES.DEFAULT_HEADER.items       = result.data

                        return MESSAGES.DEFAULT_HEADER //200

                    } else if(result.status_code == 404) {

                        return MESSAGES.ERROR_NOT_FOUND //404

                    } else if(result.status_code == 401) {

                        return MESSAGES.ERROR_NON_AUTHORIZED //401

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
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

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//updateForm
const updateForm = async (id_usuario, id_paciente, form) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        id_usuario = Number(id_usuario)
        id_paciente = Number(id_paciente)

        if(Number.isInteger(id_usuario) && id_usuario > 0) {

            if(Number.isInteger(id_paciente) && id_usuario > 0) {
            
                if(Array.isArray(form.formulario)) {
            
                    validaArray = validarArrayRespostas(form.formulario)
                
                    if(!validaArray) {
                        
                        result = await formularioDAO.updateForm(id_usuario, id_paciente, form)

                        if(result) {

                            if(result.status_code == 200) {

                                MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                                MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATE_ITEM.message
                                MESSAGES.DEFAULT_HEADER.items       = result.data

                                return MESSAGES.DEFAULT_HEADER // 200

                            } else if(result.status_code == 404) {

                                return MESSAGES.ERROR_NOT_FOUND //404
                            
                            } else if(result.status_code == 401) {

                                return MESSAGES.ERROR_NON_AUTHORIZED //401

                            }

                        } else {
                            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                        }

                    } else {
                        return validaArray //400
                    }
                
                } else {
                    return MESSAGES.ERROR_REQUIRED_FIELDS //400
                }

            } else {
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
        
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const validarArrayRespostas = (form) => {

    for(resposta of form) {

        try {
            
            let id_atividade_portage = Number(resposta.id_atividade_portage)
            let id_resposta          = Number(resposta.id_resposta)

            if(!Number.isInteger(id_atividade_portage) || id_atividade_portage <= 0) {

                return MESSAGES.ERROR_REQUIRED_FIELDS //400

            }

            if (id_resposta !== null) {

                if(!Number.isInteger(id_resposta) || id_resposta <= 0 || id_resposta === undefined) {

                    return MESSAGES.ERROR_REQUIRED_FIELDS //400

                }

            }

        } catch (error) {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

        
    }

    return false

}

module.exports = {

    getFormByIdPaciente,
    updateForm

}