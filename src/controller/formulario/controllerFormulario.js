/********************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model do Formulário
 * Data: 06/05/2026
 * Autores: Nicolas dos Santos
 * Versão: 1.0
 ********************************************************************************/

const formularioDAO = require("../../model/DAO/formulario.js")
const defaultMessages = require("../modulo/defaultMessages.js")

const listarFormularioPorPacienteId = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))
    
    try {
        if(!isNaN(id) && Number(id) > 0){
            let result = await formularioDAO.getFormByIdPatient(id)

            if(result){
                MESSAGES.defaultHeader.status = MESSAGES.successRequest.status
                MESSAGES.defaultHeader.status_code = MESSAGES.successRequest.status_code
                MESSAGES.defaultHeader.itens.formulario = {
                    id_paciente: result.paciente_id,
                    questoes: result.questoes
                }

                return MESSAGES.defaultHeader
            }

            return MESSAGES.errorNotFound
        }

        MESSAGES.errorRequiredFields.message += "{Id inválido!}"
        return MESSAGES.errorRequiredFields

    } catch (error) {
        console.log(error)
        return MESSAGES.errorInternalServerController
    }
}

module.exports = {
    listarFormularioPorPacienteId
}
