/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * usuário
 * Data: 12/05/2026
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const database = require("../../database/db")

const getUsuario = async function (id) {
    
    try {
        
        sql = 'CALL prc_usuario(?, @resultUsuario)'

        const exec = await database.raw(
            sql,[id]
        )
        
        const result = await database.raw('SELECT @resultUsuario')
        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultUsuario']
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

const getHomeUsuario = async function (id) {
    
    try {
        
        sql = "CALL prc_home(?, @resultHomeUsuario)"

        const exec = await database.raw(
            sql,[id]
        )

        const result = await database.raw('SELECT @resultHomeUsuario')
        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultHomeUsuario']
        const objectParse = JSON.parse(jsonObjectString)

        if (objectParse.status_code != 200) {
            return objectParse.status_code
        } else {
            return objectParse.data
        }

    } catch (error) {
        return false
    }

}

const getRedefinicaoSenha = async function (email) {

    try {
        
        sql =  'CALL prc_solicita_redefinicao_senha(?, @resultSolicitacao)'

        const exec = await database.raw(
            sql,[email]
        )

        const result = await database.raw('SELECT @resultSolicitacao')
        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultSolicitacao']
        const objectParse = JSON.parse(jsonObjectString)

        return objectParse.status_code

    } catch (error) {
        return false
    }

}

const getUsuarioLogin = async function (email, senha)  {

    try {
        
        sql = 'CALL prc_usuario_login(?, ?, @idUsuarioLogin, @resultUsuarioLogin)'

        const exec = await database.raw(
            sql,[ email, senha ]
        )

        const resultExec = await database.raw('SELECT @resultUsuarioLogin')
        const result = await database.raw('SELECT @resultHome')

        const requestObject = resultExec[0][0]
        const jsonRequestString = requestObject['@resultUsuarioLogin']

        const requestParse = JSON.parse(jsonRequestString)

        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultHome']

        const objectParse = JSON.parse(jsonObjectString)

        if (requestParse.status_code != 200) {
            return requestParse.status_code
        
        } else {

            if (objectParse.status_code != 404) {
                return objectParse.status_code
            } else {
                return objectParse.data
            }

        }

    } catch (error) {
        return false
    }

}

const postUsuario = async function (usuario) {

    try {
        
        sql = 'CALL prc_cria_usuario(?, ?, ?, ?, ?, ?, @resultCreateUsuario)'

        const exec = await database.raw(
            sql,[
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.data_nascimento,
                usuario.telefone,
                usuario.id_tipo_usuario
            ]
        )

        const resultExec = await database.raw('SELECT @resultCreateUsuario')
        const result = await database.raw('SELECT @resultHome')

        const requestObject = resultExec[0][0]
        const jsonRequestString = requestObject['@resultCreateUsuario']

        const requestParse = JSON.parse(jsonRequestString)

        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultHome']

        const objectParse = JSON.parse(jsonObjectString)

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

const updateUsuario = async function (id, usuario) {
    
    try {
        
        sql = 'CALL prc_atualiza_usuario(?, ?, ?, ?, ?, ?, @resultUpdateUsuario)'

        const exec = await database.raw(
            sql,[
                id,
                usuario.foto,
                usuario.nome,
                usuario.email,
                usuario.data_nascimento,
                usuario.telefone
            ]
        )

        const resultExec = await database.raw('SELECT @resultUpdateUsuario')
        const result = await database.raw('SELECT @resultUsuario')

        const requestObject = resultExec[0][0]
        const jsonRequestString = requestObject['@resultUpdateUsuario']

        const requestParse = JSON.parse(jsonRequestString)

        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultUsuario']

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

const updateUsuarioSenha = async function (id, senha) {
    
    try {
        
        sql = 'CALL prc_atualiza_senha_usuario(?, ?, @resultUpdateSenhaUsuario)'

        const exec = await database.raw(
            sql,[
                id,
                senha
            ]
        )

        const resultExec = await database.raw('SELECT @resultUpdateUsuario')
        const result = await database.raw('SELECT @resultHome')

        const requestObject = resultExec[0][0]
        const jsonRequestString = requestObject['@resultUpdateUsuario']

        const requestParse = JSON.parse(jsonRequestString)

        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultHome']

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

const deleteUsuario = async function (id, senha) {
    
    try {
        
        sql = 'CALL prc_deleta_usuario(?, ?, @resultDeleteUsuario)'

        const exec = await database.raw(
            sql,[
                id,
                senha
            ]
        )

        const result = await database.raw('SELECT @resultDeleteUsuario')

        const resultBanco = result[0][0]
        const jsonObjectString = resultBanco['@resultDeleteUsuario']

        const objectParse = JSON.parse(jsonObjectString)

        return objectParse.status_code


    } catch (error) {
        return false
    }

}