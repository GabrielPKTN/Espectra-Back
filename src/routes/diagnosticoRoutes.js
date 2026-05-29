/**********************************************************************
 * Objetivo: Arquivo responsável pela rotas de diagnostico
 * Data: 29/05/2026
 * Developer: Gabriel Lacerda
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerDiagnostico = require('../controller/controllerDiagnostico.js')

const cors = require('cors')
const bodyParser = require('body-parser')

const JWT = require('./auth/authUser.js')

router.get('/', JWT.verifyJWT, cors(), async (req, res) => {

    const result = await controllerDiagnostico.getAllDiagnostico()

    res.status(result.status_code)
    res.json(result)

})

module.exports = router