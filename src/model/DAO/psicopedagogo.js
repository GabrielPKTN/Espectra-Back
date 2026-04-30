/*****************************************************************************
 * Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL de Psicopedagogo
 * Data: 29/04/2026
 * Autores: Nicolas dos Santos 
 * Versão: 1.0
 ******************************************************************************/

const db = require("../../database/db")

const getPsychopedagogueById = async function(id) {
    try {
        const result = await db.raw(
            'SELECT * FROM tb_psicopedagogo WHERE id = ?',
            [id]
        )

        if(Array.isArray(result[0]) && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getPsychopedagogueById
}