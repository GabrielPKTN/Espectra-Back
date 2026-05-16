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



module.exports = {
    selectAtividadeByPacientetIDAndAbilidadeID
}