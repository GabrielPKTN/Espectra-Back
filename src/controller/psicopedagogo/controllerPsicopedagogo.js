/********************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model do Psicopedagogo
 * Data: 29/04/2026
 * Autores: Nicolas dos Santos
 * Versão: 1.0
 ********************************************************************************/

const psicopedagogoDAO = require("../../model/DAO/psicopedagogo.js")
const defaultMessages = require("../modulo/defaultMessages.js")

const listarPsicopedagogoPorId = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(!isNaN(id) && id > 0){
            let result = await psicopedagogoDAO.getPsychopedagogueById(id)

            if(result && result.length > 0){
                MESSAGES.defaultHeader.status = MESSAGES.successRequest.status
                MESSAGES.defaultHeader.status_code = MESSAGES.successRequest.status_code
                MESSAGES.defaultHeader.itens.psicopedagogo = result[0]
                return MESSAGES.defaultHeader
            }

            return MESSAGES.errorNotFound
        }

        MESSAGES.errorRequiredFields.message += "{Id inválido!}"
        return MESSAGES.errorRequiredFields
    } catch (error) {
        return MESSAGES.errorInternalServerController
    }
}

const listarHomePsicopedagogoPorId = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(!isNaN(id) && id > 0){
            let result = await psicopedagogoDAO.getPsychopedagogueHomeById(id)

            if(result){
                MESSAGES.defaultHeader.status = MESSAGES.successRequest.status
                MESSAGES.defaultHeader.status_code = MESSAGES.successRequest.status_code
                MESSAGES.defaultHeader.itens.psicopedagogo = result.data
                return MESSAGES.defaultHeader
            }

            return MESSAGES.errorNotFound
        }

        MESSAGES.errorRequiredFields.message += "{Id inválido!}"
        return MESSAGES.errorRequiredFields
    } catch (error) {
        return MESSAGES.errorInternalServerController
    }
}

const loginEmailSenhaPsicopedagogo = async function(email, password) {
    try {
        if(typeof email === "string" && email.trim() !== "" && email.length <= 255 && 

            typeof password === "string" && password.trim() !== "" && password.length <= 150
        ){
            return await psicopedagogoDAO.getPsychopedagogueByEmailAndPassword(email, password)
        }
        
        return defaultMessages.errorRequiredFields
    } catch (error) {
        return defaultMessages.errorInternalServerController
    }
}

module.exports = {
    listarPsicopedagogoPorId,
    listarHomePsicopedagogoPorId,
    loginEmailSenhaPsicopedagogo
}