/*****************************************************************************
 * Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL de Formulário
 * Data: 06/05/2026
 * Autores: Nicolas dos Santos 
 * Versão: 1.0
 * Data: 16/05/2026
 * Autores: Gabriel Lacerda
 * Versão: 2.0
 ******************************************************************************/

const database = require('../../database/db.js')

const getFormByIdPaciente = async function(id_usuario, id_paciente) {
    
    try {
        
        sql = 'CALL prc_formulario_pelo_id_paciente(?, ?, @resultFormulario)'

        exec = await database.raw(
            sql,[id_usuario, id_paciente]
        )

        const result                = await database.raw('SELECT @resultFormulario')
        const resultBanco           = result[0][0]
        const jsonObjectString      = resultBanco['@resultFormulario']
        const objectParse           = JSON.parse(jsonObjectString)

        return objectParse

    } catch (error) {
        return false
    }

}

const updateForm = async function(id_usuario, id_paciente, form) {

    try {
        

        form.formulario = JSON.stringify(form.formulario)

        sql = `CALL prc_atualizar_respostas_formulario(?,?,?,@resultUpdateForm)`

        exec = await database.raw(
            sql,[id_usuario, id_paciente, form.formulario]
        )

        const result                = await database.raw('SELECT @resultUpdateForm')
        const resultBanco           = result[0][0]
        const jsonObjectString      = resultBanco['@resultUpdateForm']
        const objectParse           = JSON.parse(jsonObjectString)

        return objectParse

    } catch (error) {
        console.log(error)
        return false
    }

}

module.exports = {

    getFormByIdPaciente,
    updateForm

}