/*****************************************************************************
 * Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL de Tentativa
 * Data: 07/05/2026
 * Autores: Nicolas dos Santos 
 * Versão: 1.0
 * Data: 16/05/2026
 * Autores: Gabriel Lacerda
 * Versão: 2.0
 ******************************************************************************/

const database = require('../../database/db.js')

const getTentativasByIdAtividade = async function(id_atividade) {
    
    try {
        
        sql = 'CALL prc_tentativa(?, @resultTentativa)'

        exec = await database.raw(
            sql,[id_atividade]
        )

        const result                = await database.raw('SELECT @resultTentativa')
        const resultBanco           = result[0][0]
        const jsonObjectString      = resultBanco['@resultTentativa']
        const objectParse           = JSON.parse(jsonObjectString)

        return objectParse

    } catch (error) {
        return false
    }

}

const postTentativa = async function(tentativa) {

    try {

        sql = `CALL prc_inserir_tentativa(?,?,?,?,?,@resultInsertTentativa)`

        exec = await database.raw(
            sql,[
                tentativa.id_auxilio,
                tentativa.id_atividade,
                tentativa.resultado,
                tentativa.observacao,
                tentativa.data_tentativa
            ]
        )

        const result                = await database.raw('SELECT @resultInsertTentativa')
        const resultBanco           = result[0][0]
        const jsonObjectString      = resultBanco['@resultInsertTentativa']
        const objectParse           = JSON.parse(jsonObjectString)

        return objectParse

    } catch (error) {
        return false
    }

}

module.exports = {

    getTentativasByIdAtividade,
    postTentativa

}