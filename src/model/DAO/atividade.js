/********************************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de atividade
 * Data: 16/05/2026
 * Developer: Enzo Carrilho
 * Versão: 1.0.0
 *******************************************************************************/

const db = require("../../database/db.js")

const getAtividades = async function(patientID, abilityID) {
    
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

        sql = 'CALL prc_inserir_atividade_tipo_portage(?, ?, ?, @resultInsertAtividade)'

        const exec = await db.raw(
            sql,[
                atividade.id_usuario,
                atividade.id_paciente,
                atividade.id_atividade_portage
            ]
        )


        const resultExec            = await db.raw('SELECT @resultInsertAtividade')
        const requestObject         = resultExec[0][0]
        const jsonRequestString     = requestObject['@resultInsertAtividade']
        const requestParse          = JSON.parse(jsonRequestString)

        const result                = await db.raw('SELECT @resultAtividade')
        const resultBanco           = result[0][0]
        const jsonObjectString      = resultBanco['@resultAtividade']
        const objectParse           = JSON.parse(jsonObjectString)

        if(requestParse.status_code != 201) {
            return requestParse.status_code
        } else {
            
            if(objectParse.status_code != 200) {
                return objectParse.status_code
            } else {
                return objectParse.data
            }

        }

    } catch (error) {
        return false
    }
}

const postAtividadePersonalizada = async function(atividade) {
    try {

        sql = 'CALL prc_inserir_atividade_tipo_personalizada(?, ?, ?, ?, ?, @resultInsertAtividade)'

        const exec = await db.raw(
            sql,[
                atividade.id_usuario,
                atividade.id_paciente,
                atividade.comportamento,
                atividade.valor_meses,
                atividade.id_habilidade
            ]
        )


        const resultExec = await db.raw('SELECT @resultInsertAtividade')
        const requestObject = resultExec[0][0]
        const jsonRequestString = requestObject['@resultInsertAtividade']
        const requestParse = JSON.parse(jsonRequestString)

        const result            = await db.raw('SELECT @resultAtividade')
        const resultBanco       = result[0][0]
        const jsonObjectString  = resultBanco['@resultAtividade']
        const objectParse       = JSON.parse(jsonObjectString)

        if(requestParse.status_code != 201) {
            return requestParse.status_code

        } else {
            if(objectParse.status_code != 200) {
                return objectParse.status_code
            } else {
                return objectParse.data
            }
        }

    } catch (error) {
        return false
    }
}

const updateAtividadePersonalizada = async function (id, atividade) {
    
    try {
        // Retornando 401 mesmo mandando o usuario que criou a atividade
        sql = 'CALL prc_atualiza_atividade_personalizada(?, ?, ?, ?, @resultUpdateAtividade)'

        const exec = await db.raw(
            sql,[
                id,
                atividade.id_usuario,
                atividade.comportamento,
                atividade.valor_meses,
            ]
        )

        const resultExec = await db.raw('SELECT @resultUpdateAtividade')
        const result = await db.raw('SELECT @resultAtividade')

        const requestObject = resultExec[0][0]
        const jsonRequestString = requestObject['@resultUpdateAtividade']

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
        return false
    }

}

const updateStatusAtividade = async function(id) {
      try {
        // Erro no p_id_paciente unknow column
        sql = 'CALL prc_atualiza_status_atividade(?, @resultUpdateAtividade)'

        const exec = await db.raw(
            sql,[
                id
            ]
        )

        const resultExec = await db.raw('SELECT @resultUpdateAtividade')
        const requestObject = resultExec[0][0]
        const jsonRequestString = requestObject['@resultUpdateAtividade']
        const requestParse = JSON.parse(jsonRequestString)

        return requestParse.status_code


    } catch (error) {
        return false
    }
}

const deleteAtividade = async function(id, atividade) {
    try {
        
        sql = 'CALL prc_delete_atividade(?, ?, ?, @resultDeleteAtividade)'

        const exec = await db.raw(
            sql,[
                atividade.id_usuario,
                atividade.id_paciente,
                id
            ]
        )

        const result = await db.raw('SELECT @resultDeleteAtividade')

        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultDeleteAtividade']

        const objectParse = JSON.parse(jsonObjectString)

        return objectParse.status_code


    } catch (error) {
        return false
    }
}


module.exports = {
    getAtividades,
    postAtividadePortage,
    postAtividadePersonalizada,
    updateAtividadePersonalizada,
    updateStatusAtividade,
    deleteAtividade
}