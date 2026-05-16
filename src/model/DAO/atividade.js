/********************************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de atividade
 * Data: 16/05/2026
 * Developer: Enzo Carrilho
 * Versão: 1.0.0
 *******************************************************************************/

const db = require("../../database/db.js")

const selectAtividadeByPacientetIDAndAbilidadeID = async function(patientID, abilityID) {
    try {
         sql = 'CALL prc_atividades(?, ?, @result)'

        const exec = await db.raw(
            sql,[patientID, abilityID]
        )
        
        const result = await db.raw('SELECT @result')
        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@result']
        const objectParse = JSON.parse(jsonObjectString)


        if(objectParse.status_code != 200) {
            return objectParse.status_code
        } else {
            return objectParse.data
        } 

    } catch (error) {
        return false
    }
} 

const postAtividadePortage = async function(atividade) {
    try {
        // faltando validar se o id_atividade_portage existe na tb_atividade_portage
        sql = 'CALL prc_inserir_atividade_tipo_portage(?, ?, ?, @resultInsertAtividade)'

        const exec = await db.raw(
            sql,[
                atividade.id_usuario,
                atividade.id_paciente,
                atividade.id_atividade_portage
            ]
        )


        const resultExec = await db.raw('SELECT @resultInsertAtividade')
        const result = await db.raw('SELECT @resultAtividade')

        const requestObject = resultExec[0][0]
        const jsonRequestString = requestObject['@resultInsertAtividade']

        const requestParse = JSON.parse(jsonRequestString)

        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultAtividade']

        const objectParse = JSON.parse(jsonObjectString)

        if(requestParse.status_code != 200) {
            return requestParse.status_code
        } else {
            
            if(objectParse.status_code != 200) {
                return objectParse.status_code
            } else {
                return objectParse.data
            }

        }

    } catch (error) {
        console.log(error)
        return false
    }
}



module.exports = {
    selectAtividadeByPacientetIDAndAbilidadeID,
    postAtividadePortage
}