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

const azure = require('../external/azureUpload.js')
const validateCpf = require('cpf-cnpj-validator')

//getPacienteById
const getPacienteById = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        id = Number(id)

        if (Number.isInteger(id) && id > 0) {

            result = await pacienteDAO.getPacienteById(id)

            if (result) {

                if (result.status_code == 200) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                    MESSAGES.DEFAULT_HEADER.items = result.data

                    return MESSAGES.DEFAULT_HEADER //200


                } else if (result.status_code == 404) {

                    return MESSAGES.ERROR_NOT_FOUND //404

                } else {

                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message + " [PROCEDURE]"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500

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

        paciente.diagnostico = JSON.parse(paciente.diagnostico)

        if (String(contentType).toUpperCase().startsWith('MULTIPART/FORM-DATA')) {

            const validar = validatePacientePost(paciente)

            if (!validar) {

                if (foto) {

                    const picData = {

                        originalName: foto.originalname,
                        buffer: foto.buffer,
                        size: foto.size,
                        mimetype: foto.mimetype

                    }

                    const fotoUrl = await azure.uploadAzure(picData)

                    paciente.foto = fotoUrl

                } else {
                    paciente.foto = null
                }

                arrayDiagnostico = validateDiagnostico(paciente.diagnostico)

                if (Array.isArray(arrayDiagnostico)) {
                    paciente.diagnostico = `[${arrayDiagnostico}]`
                } else {
                    return arrayDiagnostico
                }

                result = await pacienteDAO.postPaciente(paciente)

                if (result) {

                    if (result.status_code == 201) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = result.data

                        return MESSAGES.DEFAULT_HEADER //201

                    } else if (result.status_code == 404) {

                        return MESSAGES.ERROR_NOT_FOUND //404

                    } else if (result.status_code == 401) {

                        return MESSAGES.ERROR_NON_AUTHORIZED //401

                    } else if (result.status_code == 409) {

                        return MESSAGES.ERROR_CONFLICT //409

                    } else {

                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message + " [PROCEDURE]"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500

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

        id_usuario = Number(id_usuario)
        id_paciente = Number(id_paciente)

        if (Number.isInteger(id_paciente) && id_paciente > 0) {

            if (Number.isInteger(id_usuario) && id_usuario > 0) {

                result = await pacienteDAO.postPacienteUsuario(id_usuario, id_paciente)

                if (result) {

                    if (result.status_code == 200) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = result.data

                        return MESSAGES.DEFAULT_HEADER //201

                    } else if (result.status_code == 409) {

                        return MESSAGES.ERROR_CONFLICT //409

                    } else if (result.status_code == 404) {

                        return MESSAGES.ERROR_NOT_FOUND //404

                    } else {

                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message + " [PROCEDURE]"
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

//putPaciente
const putPaciente = async (id_usuario, paciente, contentType, foto) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        paciente.diagnostico = JSON.parse(paciente.diagnostico)

        if (String(contentType).toUpperCase().startsWith('MULTIPART/FORM-DATA')) {

            id_usuario = Number(id_usuario)

            if (Number.isInteger(id_usuario) && id_usuario > 0) {

                validar = validatePacientePut(paciente)

                if (!validar) {

                    if (foto) {

                        const picData = {

                            originalName: foto.originalname,
                            buffer: foto.buffer,
                            size: foto.size,
                            mimetype: foto.mimetype

                        }

                        const fotoUrl = await azure.uploadAzure(picData)

                        paciente.foto = fotoUrl

                    } else {
                        paciente.foto = null
                    }

                    arrayDiagnostico = validateDiagnostico(paciente.diagnostico)

                    if (Array.isArray(arrayDiagnostico)) {
                        paciente.diagnostico = `[${arrayDiagnostico}]`
                    } else {
                        return arrayDiagnostico
                    }

                    result = await pacienteDAO.putPaciente(id_usuario, paciente)

                    if (result) {

                        if (result.status_code == 200) {

                            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATE_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATE_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items = result

                            return MESSAGES.DEFAULT_HEADER //200


                        } else if (result.status_code == 409) {

                            return MESSAGES.ERROR_CONFLICT //409

                        } else if (result.status_code == 401) {

                            return MESSAGES.ERROR_NON_AUTHORIZED //401

                        } else if (result.status_code == 404) {

                            return MESSAGES.ERROR_NOT_FOUND //404

                        } else {

                            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message + " [PROCEDURE]"
                            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500

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

        id_usuario = Number(id_usuario)
        id_paciente = Number(id_paciente)

        if (Number.isInteger(id_usuario) && id_usuario > 0) {

            if (Number.isInteger(id_paciente) && id_paciente > 0) {

                result = await pacienteDAO.deletePaciente(id_paciente, id_usuario)

                if (result) {

                    if (result.status_code == 200) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE.message
                        delete MESSAGES.DEFAULT_HEADER.items

                        return MESSAGES.DEFAULT_HEADER //200

                    } else if (result.status_code == 404) {

                        return MESSAGES.ERROR_NOT_FOUND //404

                    } else if (result.status_code == 401) {

                        return MESSAGES.ERROR_NON_AUTHORIZED //401

                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message + " [PROCEDURE]"
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

        if (cpf && cpf.trim().length != 0) {

            validaCpf = validateCpf.cpf.isValid(cpf)

            if (validaCpf) {

                result = await pacienteDAO.getPacienteByCpf(cpf)

                if (result) {

                    if (result.status_code == 200) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                        MESSAGES.DEFAULT_HEADER.items = result.data

                        return MESSAGES.DEFAULT_HEADER //200


                    } else if (result.status_code == 404) {

                        return MESSAGES.ERROR_NOT_FOUND //404

                    } else {

                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message + " [PROCEDURE]"
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

const validateDiagnostico = (arrayDiagnostico) => {

    let arrayTranstorno = []

    for (let id_transtorno of arrayDiagnostico) {

        if (Number(id_transtorno.id) && id_transtorno.id > 0) {
            arrayTranstorno.push(id_transtorno.id)
        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

    }

    return arrayTranstorno

}

const validatePacientePost = (paciente) => {

    if (!paciente.nome || paciente.nome.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (!paciente.cpf || paciente.cpf.trim().length === 0 || !validateCpf.cpf.isValid(paciente.cpf)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CPF INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (!paciente.data_nascimento || paciente.data_nascimento.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [DATA DE NASCIMENTO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(paciente.id_serie_escolar) || paciente.id_serie_escolar <= 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID SERIE ESCOLAR INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(paciente.id_grau_suporte) || paciente.id_grau_suporte <= 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID GRAU SUPORTE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(paciente.id_responsavel) || paciente.id_responsavel <= 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID RESPONSAVEL INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

const validatePacientePut = (paciente) => {

    if (!paciente.nome || paciente.nome.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(paciente.id) || paciente.id <= 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID PACIENTE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (!paciente.cpf || paciente.cpf.trim().length === 0 || !validateCpf.cpf.isValid(paciente.cpf)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CPF INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (!paciente.data_nascimento || paciente.data_nascimento.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [DATA DE NASCIMENTO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(paciente.id_serie_escolar) || paciente.id_serie_escolar <= 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID SERIE ESCOLAR INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(paciente.id_grau_suporte) || paciente.id_grau_suporte <= 0) {

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