/****************************************************************************************
 * Objetivo: Arquivo responsável pela conexão ao banco de dados para o CRUD de Paciente
 * Espectra
 * Data: 30/04/2026
 * Developer: Enzo Carrilho e Nicolas dos Santos
 * Versão: 1.0.0
 * Data: 12/05/2026
 * Developer: Gabriel Lacerda Correia
 * Versão: 2.0.0
 ***************************************************************************************/


const database = require("../../database/db.js")

const getPacienteById = async function (id) {

    try {

        sql = 'CALL prc_buscar_paciente_completo(?, @resultPaciente)'

        const exec = await database.raw(
            sql, [id]
        )

        const result = await database.raw('SELECT @resultPaciente')
        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultPaciente']
        const objectParse = JSON.parse(jsonObjectString)

        return objectParse


    } catch (error) {
        return false
    }

}

const postPaciente = async function (paciente) {

    try {

        sql = 'CALL prc_adicionar_paciente(?,?,?,?,?,?,?,?, @resultInsertPaciente)'

        const exec = await database.raw(
            sql, [
            paciente.foto,
            paciente.nome,
            paciente.diagnostico,
            paciente.cpf,
            paciente.data_nascimento,
            paciente.id_serie_escolar,
            paciente.id_grau_suporte,
            paciente.id_responsavel
        ]
        )

        const resultExec = await database.raw('SELECT @resultInsertPaciente')
        const requestObject = resultExec[0][0]
        const jsonRequestString = requestObject['@resultInsertPaciente']
        const requestParse = JSON.parse(jsonRequestString)

        const result = await database.raw('SELECT @resultPaciente')
        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultPaciente']
        const objectParse = JSON.parse(jsonObjectString)

        if (requestParse.status_code != 200) {

            return requestParse

        } else {

            return objectParse

        }

    } catch (error) {
        return false
    }

}

const postPacienteUsuario = async function (id_usuario, id_paciente) {

    try {

        sql = 'CALL prc_inserir_relacao_usuario_paciente(?,?, @resultInsertRelation)'

        const exec = await database.raw(
            sql, [id_paciente, id_usuario]
        )

        const resultExec = await database.raw('@resultInsertRelation')
        const requestObject = resultExec[0][0]
        const jsonRequestString = requestObject['@resultInsertRelation']
        const requestParse = JSON.parse(jsonRequestString)

        const result = await database.raw('SELECT @resultPaciente')
        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultPaciente']
        const objectParse = JSON.parse(jsonObjectString)

        if (requestParse.status_code != 200) {

            return requestParse

        } else {

            return objectParse

        }

    } catch (error) {
        return false
    }

}

const putPaciente = async function (id_usuario, paciente) {

    try {

        sql = 'CALL prc_atualizar_paciente(?,?,?,?,?,?,?,?,?, @resultUpdatePaciente)'

        const exec = await database.raw(
            sql, [
            id_usuario,
            paciente.id,
            paciente.nome,
            paciente.foto,
            paciente.data_nascimento,
            paciente.diagnostico,
            paciente.cpf,
            paciente.id_serie_escolar,
            paciente.id_grau_suporte
        ]
        )

        const resultExec = await database.raw('SELECT @resultUpdatePaciente')
        const requestObject = resultExec[0][0]
        const jsonRequestString = requestObject['@resultUpdatePaciente']
        const requestParse = JSON.parse(jsonRequestString)

        const result = await database.raw('SELECT @resultPaciente')
        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultPaciente']
        const objectParse = JSON.parse(jsonObjectString)

        if (requestParse.status_code != 200) {
            return requestParse

        } else {

            return objectParse

        }

    } catch (error) {
        return false
    }

}

const deletePaciente = async function (id_paciente, id_usuario) {

    try {

        sql = 'CALL proc_delete_paciente(?,?, @resultDeletePaciente)'

        const exec = await database.raw(
            sql, [id_usuario, id_paciente]
        )

        const result = await database.raw('SELECT @resultDeletePaciente')
        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultDeletePaciente']
        const objectParse = JSON.parse(jsonObjectString)

        return objectParse

    } catch (error) {
        return false
    }

}

const getPacienteByCpf = async function (cpf) {

    sql = 'CALL prc_retorna_paciente_pelo_cpf(?, @returnPacienteCpf)'

    const exec = await database.raw(
        sql, [cpf]
    )

    const result = await database.raw('SELECT @returnPacienteCpf')
    const resultBanco = result[0][0]
    const jsonObjectString = resultBanco['@returnPacienteCpf']
    const objectParse = JSON.parse(jsonObjectString)

    return objectParse

}

module.exports = {
    getPacienteById,
    postPaciente,
    postPacienteUsuario,
    putPaciente,
    deletePaciente,
    getPacienteByCpf
}