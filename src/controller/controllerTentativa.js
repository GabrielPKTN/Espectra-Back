/***********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model de Tentativa
 * Data: 07/04/2026
 * Autores: Enzo Carrilho
 * Versão: 1.0
 * Data: 16/05/2026
 * Autores: Gabriel Lacerda
 * Versão: 2.0
 **********************************************************************************************/

const tentativaDAO = require('../model/DAO/tentativa.js')
const defaultMessages = require('./module/defaultMessages.js')

//getTentativasByIdAtividade
const getTentativasByIdAtividade = async (id_atividade) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        id_atividade = Number(id_atividade)

        if (Number.isInteger(id_atividade) && id_atividade > 0) {

            result = await tentativaDAO.getTentativasByIdAtividade(id_atividade)

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
            return MESSAGES.ERROR_REQUIRED_FIELDS //500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//postTentativa
const postTentativa = async (tentativa, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validar = validateAttempt(tentativa)

            if (!validar) {

                result = await tentativaDAO.postTentativa(tentativa)

                if (result) {

                    if (result.status_code == 200) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = result.data

                        return MESSAGES.DEFAULT_HEADER //201

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
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const validateAttempt = function (attempt) {

    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    const isInvalidValue = (value) => value === '' || value === null || value === undefined;

    const { resultado, data_tentativa, observacao, id_auxilio, id_atividade } = attempt;

    if (resultado !== 0 && resultado !== 1) {
        return createErrorResponse(MESSAGES.ERROR_REQUIRED_FIELDS, '[RESULTADO INVÁLIDO]');
    }

    if (isInvalidValue(data_tentativa) || data_tentativa.length !== 10) {
        return createErrorResponse(MESSAGES.ERROR_REQUIRED_FIELDS, '[DATA INVÁLIDA]');
    }

    if (observacao !== null && !isNaN(observacao) && observacao.length > 1500) {
        return createErrorResponse(MESSAGES.ERROR_REQUIRED_FIELDS, '[OBSERVAÇÃO INVÁLIDA]');
    }

    if (isInvalidValue(id_auxilio) || isNaN(id_auxilio) || id_auxilio <= 0) {
        return createErrorResponse(MESSAGES.ERROR_REQUIRED_FIELDS, '[ID TIPO APLICAÇÃO INVÁLIDO]');
    }

    if (isInvalidValue(id_atividade) || isNaN(id_atividade) || id_atividade <= 0) {
        return createErrorResponse(MESSAGES.ERROR_REQUIRED_FIELDS, '[ID ATIVIDADE INVÁLIDO]');
    }

    return false;

}

module.exports = {
    getTentativasByIdAtividade,
    postTentativa
}