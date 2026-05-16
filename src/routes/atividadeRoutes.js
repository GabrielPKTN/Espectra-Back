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

    const resultGet = await controllerAtividade.getAtividadeByPacienteIDAndAbilidadeID(pacienteId, habilidadeId)

    res.status(resultGet.status_code)
    res.json(resultGet)

})

// postAtividadePortage
router.post('/portage', cors(), JWT.verifyJWT, bodyParserJSON, async (req, res) => {

    const contentType = req.headers['content-type']
    const dadosBody = req.body

    const resultInsert = await controllerAtividade.postAtividadePortage(dadosBody, contentType)

    res.status(resultInsert.status_code)
    res.json(resultInsert)

})

// postAtividadePersonalizada
router.post('/personalizada', cors(), JWT.verifyJWT, bodyParserJSON, async (req, res) => {

    const contentType = req.headers['content-type']
    const dadosBody = req.body

    const resultInsert = await controllerAtividade.postAtividadePersonalizada(dadosBody, contentType)

    res.status(resultInsert.status_code)
    res.json(resultInsert)

})

// updateUsuario
router.put('/personalizada/:id', JWT.verifyJWT, cors(), bodyParserJSON, async (req, res) => {

    const atividadeId = req.params.id

    if(req.body){
        const contentType = req.headers['content-type']
        const dadosBody = req.body

        const resultUpdate = await controllerAtividade.updateAtividadePersonalizada(atividadeId, dadosBody, contentType)

        res.status(resultUpdate.status_code)
        res.json(resultUpdate)
    }
    else{
        const resultUpdateStatus = await controllerAtividade.updateStatusAtividade(atividadeId)

        res.status(resultUpdateStatus.status_code)
        res.json(resultUpdateStatus)
    }

})


router.delete('/:id', JWT.verifyJWT, cors(), bodyParserJSON, async (req, res) => {
    
    const id = req.params.id
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    const resultDelete = await controllerAtividade.deleteAtividade(id, dadosBody, contentType)

    res.status(resultDelete.status_code)
    res.json(resultDelete)

})

module.exports = router