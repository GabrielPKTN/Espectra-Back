/***********************************************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de transtorno do banco de dados.
 * Data: 29/05/2026
 * Autores: Gabriel Lacerda Correia
 * Versão: 1.0
 **********************************************************************************************/

const diagnosticoDAO = require('../model/DAO/diagnostico.js')
const defaultMessages = require('./module/defaultMessages.js')

const getAllDiagnostico = async () => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        result = await diagnosticoDAO.getAllDiagnostico()

        if(result) {
            
            MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_REQUEST.message
            MESSAGES.DEFAULT_HEADER.items       = result

            return MESSAGES.DEFAULT_HEADER //200

        }

        if(!result) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

} 

module.exports = { getAllDiagnostico }