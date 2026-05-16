/**********************************************************************
 * Objetivo: Arquivo responsável pela rotas de atividades
 * Data: 16/05/2026
 * Developer: Enzo Carrilho
 * Versão: 1.0.0
 *********************************************************************/

const express               = require('express')
const router                = express.Router()
const controllerAtividade   = require('../controller/controllerAtividade.js')

const cors       = require('cors')           
const bodyParser = require('body-parser')    

const bodyParserJSON = bodyParser.json()

const JWT = require('./auth/authUser.js')

// getAtividade
router.get('/', JWT.verifyJWT, cors(), async (req, res) => {

    const pacienteId = req.query.id_paciente
    const habilidadeId = req.query.id_habilidade

    const atividade = await controllerAtividade.getAtividadeByPacienteIDAndAbilidadeID(pacienteId, habilidadeId)

    res.status(atividade.status_code)
    res.json(atividade)

})

module.exports = router