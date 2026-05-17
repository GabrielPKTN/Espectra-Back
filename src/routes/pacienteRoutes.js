/********************************************************************************
 * Objetivo: Arquivo responsável pelas rotas de Endpoints de Paciente
 * Data: 30/04/2026
 * Autores: Enzo Carrilho
 * Versão: 1.0
 * Data: 12/05/2026
 * Developer: Gabriel Lacerda Correia
 * Versão: 2.0
 ********************************************************************************/

const express               = require('express')
const router                = express.Router()
const controllerPaciente    = require('../controller/controllerPaciente.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const multerConfig = require('../config/multerConfig.js')

const bodyParserJSON = bodyParser.json()

const JWT = require('./auth/authUser.js')
const multer = require('multer')

//getPacienteById
router.get('/:id', JWT.verifyJWT, cors(), async (req, res) => {

    const pacienteId = req.params.id

    const paciente = await controllerPaciente.getPacienteById(pacienteId)

    res.status(paciente.status_code)
    res.json(paciente)

})

//getPacienteByCpf
router.get('/', JWT.verifyJWT, cors(), async (req, res) => {

    const pacienteCpf = req.query.cpf

    const paciente = await controllerPaciente.getPacienteByCpf(pacienteCpf)

    res.status(paciente.status_code)
    res.json(paciente)

})

//postPaciente
router.post('/', JWT.verifyJWT, multerConfig.single('foto'), cors(), async(req, res) => {

    const contentType   = req.headers['content-type']
    const dadosBody     = req.body
    const fotoFile      = null

    if(req.file) {
        fotoFile = req.file
    }

    const paciente = await controllerPaciente.postPaciente(dadosPaciente, contentType, fotoFile)

    res.status(paciente.status_code)
    res.json(paciente)

})

//postPacienteUsuario
router.post('/:id_paciente/:id_usuario', JWT.verifyJWT, cors(), async (req, res) => {

    const idPaciente = req.params.id_paciente
    const idUsuario  = req.params.id_usuario

    const paciente = await controllerPaciente.postPacienteUsuario(idUsuario, idPaciente)

    res.status(paciente.status_code)
    res.json(paciente)

})


//putPaciente
router.put('/:id_usuario', JWT.verifyJWT, multerConfig.single('foto'), cors(), async (req, res) => {

    const idUsuario         = req.params.id_usuario
    const dadosPaciente     = req.body
    const contentType       = req.headers['content-type']
    const fotoFile          = null

    if(req.file) {
        fotoFile = req.file
    }

    const paciente = await controllerPaciente.putPaciente(idUsuario, dadosPaciente, contentType, fotoFile)

    res.status(paciente.status_code)
    res.json(paciente)

})

//deletePaciente
router.delete('/:id_paciente/:id_usuario', JWT.verifyJWT, cors(), async (req, res) => {

    const idPaciente = req.params.id_paciente
    const idUsuario  = req.params.id_usuario

    const paciente = await controllerPaciente.deletePaciente(idUsuario, idPaciente)

    res.status(paciente.status_code)
    res.json(paciente)

})


module.exports = router