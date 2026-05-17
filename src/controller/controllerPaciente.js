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
const postPaciente = async (paciente, contentType, foto) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))
    
    try {
        
        if (String(contentType).toUpperCase().startsWith('MULTIPART/FORM-DATA')) {

            const validar = validatePacientePost(paciente)

            if(!validar) {

                if(foto) {
                
                    const picData = {

                        originalName: foto.originalname,
                        buffer: foto.buffer,
                        size: foto.size,
                        mimetype: foto.mimetype

                    }

                    const fotoUrl = await azure.uploadAzure(picData)

                    paciente.foto = fotoUrl

                } 

                result = await pacienteDAO.postPaciente(paciente)

                if(result) {

                    if (result == 409) {
                        return MESSAGES.ERROR_CONFLICT //409
                    } else if (result == 404) {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    } else if (result == 401) {
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

//postRelacaoUsuarioPaciente
const postPacienteUsuario = async (id_usuario, id_paciente) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))
    
    try {
        
        if(isNaN(id_usuario) || id_paciente <= 0) {

            if(isNaN(id_paciente) || id_paciente <= 0) {

                result = await pacienteDAO.postPacienteUsuario(id_usuario, id_paciente)

                if(result == 404) {
                    return MESSAGES.ERROR_NOT_FOUND //404
                } else if (result == 409) {
                    return MESSAGES.ERROR_CONFLICT //409    
                } else {

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items       = result
                    
                    return MESSAGES.DEFAULT_HEADER //201

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

//putPaciente
const putPaciente = async (id_usuario, paciente, contentType) => {


    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))
    
        try {
            
            if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

                if(!isNaN(id_usuario) && id_usuario > 0 && id_usuario != "" && id_usuario != null) {

                    validar = validatePacientePut(paciente)

                    if(!validar) {
    
                        result = await pacienteDAO.putPaciente(id_usuario, paciente)
    
                        if(result) {
    
                            if (result == 404) {
                                return MESSAGES.ERROR_NOT_FOUND //404
                            } else if (result == 409) {
                                return MESSAGES.ERROR_CONFLICT //409
                            } else if (result == 401){
                                return MESSAGES.ERROR_NON_AUTHORIZED //401
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

//deletePaciente
const deletePaciente = async (id_usuario, id_paciente) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if(isNaN(paciente.id_usuario) || paciente.id_usuario <= 0) {

            if(isNaN(paciente.id_paciente) || paciente.id_paciente <= 0) {

                result = await pacienteDAO.deletePaciente(id_paciente, id_usuario)

                if(result) {

                    if (result == 404) {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    } else if (result == 200) {
                        return MESSAGES.SUCCESS_REQUEST //200
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

//getPacienteByCpf
const getPacienteByCpf = async (cpf) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if(cpf || !cpf.trim().length === 0) {

            result = await pacienteDAO.getPacienteByCpf(cpf)

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


const validatePacientePost = (paciente) => {

    for (let id_transtorno of paciente.diagnostico) {

        if(isNaN(id_transtorno.id) || id_transtorno.id <= 0) {

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

const validatePacientePut = (paciente) => {

    for (let id of paciente.diagnostico) {
        
        if(isNaN(id) || id <= 0) {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID TRANSTORNO INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        }

    }

    if(paciente.foto != null) {

        //TODO

    }

    if(!paciente.nome || paciente.nome.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(isNaN(paciente.id) || paciente.id <= 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID PACIENTE INCORRETO]'
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
    
    } else {
        return false
    }

}

module.exports = {
    getPacienteById,
    getPacienteByCpf,
    postPaciente,
    postPacienteUsuario,
    putPaciente,
    deletePaciente
}