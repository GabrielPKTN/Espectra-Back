/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller dos logs
 * Data: 09/12/2025
 * Developer: Gabriel Lacerda
 * Versão: 1.0.0
 *********************************************************************/

const express               = require('express')
const router                = express.Router()
const controllerUsuario     = require('../controller/controllerUsuario.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json()

// getUsuario
router.get('/:id', cors(), async (req, res) => {

    const userId = req.params.id

    const user = await controllerUsuario.getUsuario(userId)

    res.status(user.status_code)
    res.json(user)

})

// getHomeUsuario
router.get('/home/:id', cors(), async (req, res) => {

    const userId = req.params.id
    
    const userHome = await controllerUsuario.getHomeUsuario(userId)

    res.status(userHome.status_code)
    res.json(userHome)

})

// getRedefinicaoSenha
router.get('/', cors(), async (req, res) => {

    const userEmail = req.query.email

    const userRequest = await controllerUsuario.getRedefinicaoSenha(userEmail)

    res.status(userRequest.status_code)
    res.json(userRequest)

})

// getUsuarioLogin
router.post('/login', cors(), bodyParserJSON, async (req, res) => {

    const contentType = req.headers['content-type']
    dadosBody = req.body

    const userRequest = await controllerUsuario.getUsuarioLogin(dadosBody, contentType)

    res.status(userRequest.status_code)
    res.json(userRequest)

})

// postUsuario
router.post('/', cors(), bodyParserJSON, async (req, res) => {

    const contentType = req.headers['content-type']
    const dadosBody = req.body

    const userInsert = await controllerUsuario.postUsuario(dadosBody, contentType)

    res.status(userInsert.status_code)
    res.json(userInsert)

})

// updateUsuario
router.put('/:id', cors(), bodyParserJSON, async (req, res) => {

    const userId = req.params.id
    const contentType = req.headers['content-type']
    const dadosBody = req.body

    const userUpdate = await controllerUsuario.updateUsuario(userId, dadosBody, contentType)

    res.status(userUpdate.status_code)
    res.json(userUpdate)

})

// updateUsuarioSenha
router.put('/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    const userPasswordUpdate = await controllerUsuario.updateUsuarioSenha(dadosBody, contentType)

    res.status(userPasswordUpdate.status_code)
    res.json(userPasswordUpdate)

})

// deleteUsuario
router.delete('/', cors(), bodyParserJSON, async (req, res) => {
    
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    const userDelete = await controllerUsuario.deleteUsuario(dadosBody, contentType)

    res.status(userDelete.status_code)
    res.json(userDelete)

})


module.exports = router