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

            // Tirei essa validação pois a data pode vir null caso o paciente não tenha atividade
            // e o retorno acabaria sendo errado - 500, enquanto deveria ser 404

            //if(result){

                if(result == 404 || result == null){
                    return MESSAGES.ERROR_NOT_FOUND //404

                }else{

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_REQUEST.message
                    MESSAGES.DEFAULT_HEADER.items       = result
                    
                    return MESSAGES.DEFAULT_HEADER //200

                }

            //}else{
                //return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            //}
            

        }else{
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
            
        

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
     
}

module.exports = {
    getAtividadeByPacienteIDAndAbilidadeID
}