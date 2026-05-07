/*****************************************************************************
 * Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL de Tentativa
 * Data: 07/05/2026
 * Autores: Nicolas dos Santos 
 * Versão: 1.0
 ******************************************************************************/

const db = require("../../../database/db.js")

const getAttemptById = async function(id) {
    try {
        const result = await db.raw(
            'SELECT * FROM vw_tentativa_id WHERE id_tentativa = ?', [id]
        )

        return result [0][0] || false
    } catch (error) {
        console.log(error)
        return false
    }
}

const getAttemptByActivityId = async function(id) {
    try {
         const result = await db('tb_tentativa').where('id_atividade', '=', id).select('*')
        
        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const insertAttempt = async function(attempt) {
     try {

        await db.raw(
            'CALL prc_inserir_tentativa(?, ?, ?, ?, ?, @msg)', 
            [
                attempt.tipo_aplicacao_id, 
                attempt.atividade_id, 
                attempt.resultado, 
                attempt.observacao, 
                attempt.data
            ]
        )

        const [result] = await db.raw('SELECT @msg as msg')

        const message = result[0].msg

        const parsedMessage = typeof message === "string" ? JSON.parse(message) : message

        if(parsedMessage)
            return parsedMessage
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getAttemptById,
    getAttemptByActivityId,
    insertAttempt
}