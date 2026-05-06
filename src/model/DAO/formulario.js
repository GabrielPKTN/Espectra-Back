/*****************************************************************************
 * Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL de Formulário
 * Data: 06/05/2026
 * Autores: Nicolas dos Santos 
 * Versão: 1.0
 ******************************************************************************/

const db = require("../../database/db")

const getFormByIdPatient = async function(id) {
    try {
        const result = await db.raw(
            'SELECT * FROM vw_formulario_paciente_id WHERE id_paciente = ?', [id]
        )

        return result[0][0] || false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getFormByIdPatient
}