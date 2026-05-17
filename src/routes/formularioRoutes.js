/********************************************************************************
 * Objetivo: Arquivo responsável pelas rotas de Endpoints de Formulário
 * Data: 06/05/2026
 * Autores: Nicolas dos Santos
 * Versão: 1.0
 * Data: 16/05/2026
 * Developer: Gabriel Lacerda Correia
 * Versão: 2.0
 ********************************************************************************/

const express               = require('express')
const router                = express.Router()
const controllerForm    = require('../controller/controllerFormulario.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json()

const JWT = require('./auth/authUser.js')

router.get('/:id_paciente/:id_usuario', JWT.verifyJWT, cors(), async (req, res) => {

    const id_paciente = req.params.id_paciente
    const id_usuario  = req.params.id_usuario

    const form = await controllerForm.getFormByIdPaciente(id_usuario, id_paciente)

    res.status(form.status_code)
    res.json(form)

})

router.put('/:id_paciente/:id_usuario', JWT.verifyJWT, bodyParserJSON, cors(), async (req, res) => {

    const id_paciente = req.params.id_paciente
    const id_usuario  = req.params.id_usuario
    const dadosBody   = req.body
    const formulario  = dadosBody.formulario

    const form = await controllerForm.updateForm(id_usuario, id_paciente, dadosBody)
    
    res.status(form.status_code)
    res.json(form)

})

module.exports = router