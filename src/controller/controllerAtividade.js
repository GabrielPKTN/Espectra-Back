/********************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a 
 * Model de Atividade
 * Data: 16/05/2026
 * Autores: Enzo Carrilho
 * Versão: 1.0
 * Data: 21/06/2026
 * Developer: Gabriel Lacerda
 * Versão: 1.0.1
 ********************************************************************************/
const atividadeDAO = require('../model/DAO/atividade.js')
const defaultMessages = require("./module/defaultMessages.js")


const getAtividadeById = async (id_atividade, id_usuario) => {

    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        id_atividade = Number(id_atividade)
        id_usuario = Number(id_usuario)

        if (Number.isInteger(id_atividade) && id_atividade > 0) {

            if (Number.isInteger(id_usuario) && id_usuario > 0) {

                result = await atividadeDAO.getAtividadeById(id_atividade, id_usuario)

                if (result) {

                    if (result.status_code == 200) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                        MESSAGES.DEFAULT_HEADER.items = result.data

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

            } else
                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID USUÁRIO INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID ATIVIDADE INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const getAllAtividadesFalse = async (id_paciente, id_habilidade) => {

    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        id_paciente = Number(id_paciente)
        id_habilidade = Number(id_habilidade)

        if (Number.isInteger(id_paciente) && id_paciente > 0) {

            if (Number.isInteger(id_habilidade) && id_habilidade > 0) {

                result = await atividadeDAO.getAllAtividadesFalse(id_paciente, id_habilidade)

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

            } else
                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID PACIENTE INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID HABILIDADE INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const getAtividades = async function (id_paciente, id_habilidade) {

    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (!isNaN(id_paciente) && Number(id_paciente) > 0 && id_paciente != null && id_paciente != "") {

            if (!isNaN(id_habilidade) && Number(id_habilidade) > 0 && id_paciente != null && id_paciente != "") {

                result = await atividadeDAO.getAtividades(id_paciente, id_habilidade)

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

            } else
                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID HABILIDADE INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID PACIENTE INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
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

            if (!validar) {

                result = await atividadeDAO.postAtividadePortage(atividade)

                if (result) {

                    if (result.status_code == 200) {

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

const postAtividadePersonalizada = async (atividade, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            const validar = validatePostAtividadePersonalizada(atividade)

            if (!validar) {

                result = await atividadeDAO.postAtividadePersonalizada(atividade)

                if (result) {

                    if (result.status_code == 200) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = result.data

                        return MESSAGES.DEFAULT_HEADER //201

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

            id = Number(id)

            if (Number.isInteger(id) && id > 0) {

                validar = validateUpdateAtividadePersonalizada(atividade)

                if (!validar) {

                    result = await atividadeDAO.updateAtividadePersonalizada(id, atividade)

                    if (result) {

                        if (result.status_code == 200) {

                            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATE_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATE_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items = result.data

                            return MESSAGES.DEFAULT_HEADER //200

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

const updateStatusAtividade = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {


        if (!isNaN(id) && id > 0 && id != "" && id != null) {

            result = await atividadeDAO.updateStatusAtividade(id)

            if (result) {

                if (result.status_code == 200) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATE_ITEM.message
                    delete MESSAGES.DEFAULT_HEADER.items

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


const deleteAtividade = async (id, dados, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            if (!isNaN(dados.id_paciente) && dados.id_paciente > 0 && dados.id_paciente != "" && dados.id_paciente != null) {

                if (!isNaN(dados.id_usuario) && dados.id_usuario > 0 && dados.id_usuario != "" && dados.id_usuario != null) {

                    result = await atividadeDAO.deleteAtividade(id, dados)

                    if (result) {

                        if (result.status_code == 200) {

                            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE.status_code
                            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE.message
                            delete MESSAGES.DEFAULT_HEADER.items

                            return MESSAGES.DEFAULT_HEADER //200

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
                    return MESSAGES.ERROR_REQUIRED_FIELDS //400
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


const validateAtividadePortage = (atividade) => {
    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    if (isNaN(atividade.id_usuario) || Number(atividade.id_usuario) <= 0 || atividade.id_usuario == '' || atividade.id_usuario == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID USUARIO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(atividade.id_paciente) || Number(atividade.id_paciente) <= 0 || atividade.id_paciente == '' || atividade.id_paciente == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID PACIENTE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(atividade.id_atividade_portage) || Number(atividade.id_atividade_portage) <= 0 || atividade.id_atividade_portage == '' || atividade.id_atividade_portage == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID ATIVIDADE PORTAGE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

const validatePostAtividadePersonalizada = (atividade) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    if (isNaN(atividade.id_usuario) || Number(atividade.id_usuario) <= 0 || atividade.id_usuario == '' || atividade.id_usuario == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID USUARIO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(atividade.id_paciente) || Number(atividade.id_paciente) <= 0 || atividade.id_paciente == '' || atividade.id_paciente == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID PACIENTE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (!atividade.comportamento || atividade.comportamento.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [COMPORTAMENTO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (!atividade.valor_meses || atividade.valor_meses < 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [VALOR MESES INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(atividade.id_habilidade) || Number(atividade.id_habilidade) <= 0 || atividade.id_habilidade == '' || atividade.id_habilidade == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID HABILIDADE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

const validateUpdateAtividadePersonalizada = (atividade) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))


    if (isNaN(atividade.id_usuario) || Number(atividade.id_usuario) <= 0 || atividade.id_usuario == '' || atividade.id_usuario == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID USUARIO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (!atividade.comportamento || atividade.comportamento.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [COMPORTAMENTO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (!atividade.valor_meses || atividade.valor_meses < 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [VALOR MESES INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}


module.exports = {
    getAllAtividadesFalse,
    getAtividadeById,
    getAtividades,
    postAtividadePortage,
    postAtividadePersonalizada,
    updateAtividadePersonalizada,
    updateStatusAtividade,
    deleteAtividade
}