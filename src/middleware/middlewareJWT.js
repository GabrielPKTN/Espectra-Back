/**********************************************************************
 * Objetivo: Implementação do JWT no projeto
 * Data: 12/05/2026
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const jwt = require('jsonwebtoken')
const SECRET = '&$P&C!R@'
const EXPIRES = 100000000000000 //1800

//Gera o token
const createJWT = async (payload) => {

    // payload - identificação do usuário autenticado
    // SECRET - chave secreta
    // expiresIn - tempo de expiração do token em segundos
    const token = jwt.sign({userID: payload}, SECRET, {expiresIn: EXPIRES})

    return token

}

//Valida o token
const validateJWT = async (token) => {

    let status;

    //Valida a autenticidade do token
    jwt.verify( token, SECRET, async (err, decode) => {
        
        if(err) {
            status = false
        } else {
            status = true
        }

    })

    return status

}

module.exports = { createJWT, validateJWT }