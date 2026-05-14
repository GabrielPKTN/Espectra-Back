/***********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model do Paciente
 * Data: 30/04/2026
 * Autores: Enzo Carrilho
 * Versão: 1.0
 * Data: 12/05/2026
 * Developer: Gabriel Lacerda Correia
 * Versão: 2.0
 **********************************************************************************************/

const pacienteDAO = require('../model/DAO/paciente.js')
const defaultMessages = require('./module/defaultMessages.js')

//getPacienteById
const getPacienteById = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))
    
    try {
        
        if(!isNaN(id) && id > 0 && id != "" && id != null) {

            result = await pacienteDAO.getPacienteById(id)

            if(result) {

                if (result == 404) {
                    return MESSAGES.ERROR_NOT_FOUND //404
                } else {

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_REQUEST.message
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

//postPaciente
const postPaciente = async (paciente, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))
    
    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            const validar = validatePacientePost(paciente)

            if(!validar) {

                const validarArrayId = validateArrayId(paciente.diagnostico)

                result = await usuarioDAO.postUsuario(usuario)

                if(result) {

                    if (result == 409) {
                        return MESSAGES.ERROR_CONFLICT //409
                    } else if (result == 404) {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    } else {

                        // Gera o token
                        let tokenUser = await JWT.createJWT(result.id)

                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_CREATED_ITEM.message
                        //Adiciona o token no item retornado
                        MESSAGES.DEFAULT_HEADER.token       = tokenUser
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

//putPaciente
//deletePaciente
//getPacienteByCpf

const validateArrayId = (arrayDiagnostico) => {

    for (let id of arrayDiagnostico) {
        
        if(isNaN(id) || id <= 0) {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID TRANSTORNO INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        }

    }

    return false
    
}

const validatePacientePost = (paciente) => {

    for (let id of paciente.diagnostico) {
        
        if(isNaN(id) || id <= 0) {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID TRANSTORNO INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        }

    }

    if(!paciente.nome || paciente.nome.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!paciente.cpf || paciente.cpf.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CPF INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!paciente.data_nascimento || paciente.data_nascimento.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [DATA DE NASCIMENTO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(isNaN(paciente.id_serie_escolar) || paciente.id_serie_escolar <= 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID SERIE ESCOLAR INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
        
    }else if(isNaN(paciente.id_grau_suporte) || paciente.id_grau_suporte <= 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID GRAU SUPORTE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(isNaN(paciente.id_responsavel) || paciente.id_responsavel <= 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID RESPONSAVEL INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    
    } else {
        return false
    }

}