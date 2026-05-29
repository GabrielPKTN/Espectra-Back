/********************************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de atividade
 * Data: 16/05/2026
 * Developer: Enzo Carrilho
 * Versão: 1.0.0
 * Data: 29/05/2026
 * Developer: Gabriel Lacerda
 * Versão: 1.0.1
 *******************************************************************************/

const database = require('../../database/db.js')

async function getAllDiagnostico() {

    try {
    
        sql = 'SELECT * FROM tb_sigla_transtorno'
    
       result = await database.raw(sql)

       return result[0]

    } catch (error) {
        return false
    }

}

module.exports = { getAllDiagnostico }