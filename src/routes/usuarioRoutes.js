/**********************************************************************
 * Objetivo: Arquivo responsável pela rotas de usuário
 * Data: 12/05/2026
 * Developer: Gabriel Lacerda
 * Versão: 1.0.0
 *********************************************************************/

const express               = require('express')
const router                = express.Router()
const controllerUsuario     = require('../controller/controllerUsuario.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const multerConfig = require('../config/multerConfig.js')

const bodyParserJSON = bodyParser.json()

const JWT = require('./auth/authUser.js')

// getUsuario
router.get('/:id', JWT.verifyJWT, cors(), async (req, res) => {

    const userId = req.params.id

    const user = await controllerUsuario.getUsuario(userId)

    res.status(user.status_code)
    res.json(user)

})

// getHomeUsuario
router.get('/home/:id', JWT.verifyJWT, cors(), async (req, res) => {

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
router.post('/login', bodyParserJSON, cors(), async (req, res) => {

    const contentType = req.headers['content-type']
    let dadosBody = req.body

    const userRequest = await controllerUsuario.getUsuarioLogin(dadosBody, contentType)

    res.status(userRequest.status_code)
    res.json(userRequest)

})

// postUsuario
router.post('/', cors(), bodyParserJSON, async (req, res) => {

    const contentType = req.headers['content-type']
    const dadosBody = req.body

    const userInsert = await controllerUsuario.postUsuario(dadosBody, contentType)

    userInsert.erro_aqui = "post"

    res.status(userInsert.status_code)
    res.json(userInsert)

})

// updateUsuario
router.put('/:id', JWT.verifyJWT, multerConfig.single('foto'), cors(), async (req, res) => {

    const userId        = req.params.id
    const contentType   = req.headers['content-type']
    const dadosBody     = req.body
    let fotoFile      = null

    if(req.file) {
        fotoFile = req.file
    }

    const userUpdate    = await controllerUsuario.updateUsuario(userId, dadosBody, contentType, fotoFile)

    res.status(userUpdate.status_code)
    res.json(userUpdate)

})

// updateUsuarioSenha
router.put('/', JWT.verifyJWT, cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    const userPasswordUpdate = await controllerUsuario.updateUsuarioSenha(dadosBody, contentType)

    res.status(userPasswordUpdate.status_code)
    res.json(userPasswordUpdate)

})

// deleteUsuario
router.delete('/', JWT.verifyJWT, cors(), bodyParserJSON, async (req, res) => {
    
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    const userDelete = await controllerUsuario.deleteUsuario(dadosBody, contentType)

    res.status(userDelete.status_code)
    res.json(userDelete)

})


module.exports = router