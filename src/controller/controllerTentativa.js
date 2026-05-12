/***********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model de Tentativa
 * Data: 07/04/2026
 * Autores: Enzo Carrilho
 * Versão: 1.0
 **********************************************************************************************/

const attemptDAO = require('../../model/DAO/tentativa/tentativa.js')
const defaultMessages = require('../modulo/defaultMessages.js')

const selectAttemptById = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        if(!isNaN(id) && id != '' && Number(id) > 0){
            let resultAttempt = await attemptDAO
           
            if(resultAttempt){
                const attempt = resultAttempt.data
                
                if(patient != null){
                    return attempt //200

                }else{
                    return MESSAGES.errorNotFound //404
                }

            }else{
                return MESSAGES.errorInternalServer//500
            }

        }else{
            MESSAGES.errorRequiredFields.message += ' [ID Inválido]'
            return MESSAGES.errorRequiredFields //400
        }
        
    } catch (error) {
        return MESSAGES.errorInternalServer //500
    }
}

const selectAttemptByActivityId = async function(activityID){
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(!isNaN(activityID) && activityID != '' && activityID.length == 10){
            let resultAttempt = await resultAttempt.selectAttemptByActivityId(activityID)

            if(resultAttempt){
                
                if(resultAttempt != null && resultAttempt.length > 0)
                    return resultAttempt[0]
                else 
                    return MESSAGES.errorNotFound //404

            }else{
               return MESSAGES.errorInternalServer //500
            }

        }else{
            MESSAGES.errorRequiredFields.message += ' [Número de Registro Inválido]' 
            return MESSAGES.errorRequiredFields //400
        }

    } catch (error) {
        return MESSAGES.errorInternalServer //500
    }
}


const setAttempt = async function(attempt, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validate = await validateAttempt(attempt)
            
            if(!validate){
                let resultAttempt = await attemptDAO.insertAttempt(attempt)

                if(resultAttempt.status_code){
                    
                    if(resultAttempt.status_code == 200){         
                        return resultAttempt.data //200
                    }
                    else{
                        return resultAttempt  // 400 | 409
                    }

                }else{
                    return MESSAGES.errorInternalServer //500
                }

            }else{
                return validate //400
            }
        }else{
            return MESSAGES.errorContentType //415
        }
        
    } catch (error) {
         return MESSAGES.errorInternalServer //500
    }
}

module.exports = {
    selectAttemptById,
    selectAttemptByActivityId,
    setAttempt
}

const validateAttempt = function(attempt){
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    if(attempt.resultado == '' || attempt.resultado == null || attempt.resultado == undefined || attempt.resultado != 1 || attempt.resultado != 0 ){
        MESSAGES.errorRequiredFields.message += ' [resultado Inválido]' 
        return MESSAGES.errorRequiredFields //400

    }else if(attempt.data == '' || attempt.data == null || attempt.data == undefined || attempt.data.length != 10){
        MESSAGES.errorRequiredFields.message += ' [Data Inválido]' 
        return MESSAGES.errorRequiredFields //400
    
    }else if(attempt.id_tipo_aplicacao <= 0 || isNaN(attempt.id_tipo_aplicacao) || attempt.id_tipo_aplicacao == '' || attempt.id_tipo_aplicacao == null || attempt.id_tipo_aplicacao == undefined){
        MESSAGES.errorRequiredFields.message += ' [id_tipo_aplicacao Inválido]' 
        return MESSAGES.errorRequiredFields //400

    }else if(attempt.id_atividade <= 0 || isNaN(attempt.id_atividade) || attempt.id_atividade == '' || attempt.id_atividade == null || attempt.id_atividade == undefined){
        MESSAGES.errorRequiredFields.message += ' [id_atividade Inválido]' 
        return MESSAGES.errorRequiredFields //400

    }else{
        return false
    }

} 