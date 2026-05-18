/********************************************************************************
 * Objetivo: Arquivo responsável pelas rotas de Endpoints de Tentativa
 * Data: 30/04/2026
 * Autores: Enzo Carrilho
 * Versão: 1.0
 * Data: 16/05/2026
 * Autores: Gabriel Lacerda
 * Versão: 2.0
 ********************************************************************************/

const express               = require('express')
const router                = express.Router()
const controllerTentativa   = require('../controller/controllerTentativa.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json()

const JWT = require('./auth/authUser.js')

router.get("/:id_atividade", JWT.verifyJWT, cors(), async(req, res) => {
    
    const id_atividade = req.params.id_atividade
    
    let result = await controllerTentativa.getTentativasByIdAtividade(id_atividade)

    res.status(result.status_code)
    res.json(result)

})    

router.post("/", JWT.verifyJWT, cors(), bodyParserJSON, async(req, res) => {

    let dadosBody = req.body
    let contentType = req.headers['content-type']

    let result = await controllerTentativa.postTentativa(dadosBody, contentType)
    
    res.status(result.status_code)
    res.json(result)
    
}) 

module.exports = router