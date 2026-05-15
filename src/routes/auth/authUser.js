/**********************************************************************
 * Objetivo: Arquivo responsável pela validação do token vindo do
 * usuário
 * Data: 12/05/2026
 * Developer: Gabriel Lacerda
 * Versão: 1.0.0
 *********************************************************************/


const JWT = require('../../middleware/middlewareJWT.js')
const defaultMessages = require('../../controller/module/defaultMessages.js')

//Receber o token encaminhado nas requisições e solicitar a validação
const verifyJWT = async (req, res, next) => {
     

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    let token = req.headers['x-access-token']

    const autenticidadeToken = await JWT.validateJWT(token)

    
    if(autenticidadeToken) {
        next();
    } else {
        return res.status(401).json(MESSAGES.ERROR_NON_AUTHORIZED).end() //401
    }


}

module.exports = {verifyJWT}