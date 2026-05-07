/********************************************************************************
 * Objetivo: Arquivo responsável pelas rotas de Endpoints de Tentativa
 * Data: 30/04/2026
 * Autores: Enzo Carrilho
 * Versão: 1.0
 ********************************************************************************/

const express =         require('express')
const router =          express.Router()
const cors =            require('cors')
const bodyParser =      require('body-parser')

const bodyParserJSON = bodyParser.json() 

const controllerAttempt = require('../../controller/tentativa/controllerTentativa.js')

router.get("/:id", async(req, res) => {
    const id = req.params.id
    
    let result = await controllerAttempt.selectAttemptById(id)

    if(result.status_code)
        res.status(result.status_code).json(result)
    else
        res.status(200).json(result)
})    

router.get("/atividade_id", async(req, res) => {
    const activityID = req.params.atividade_id
    
    let result = await controllerAttempt.selectAttemptByActivityId(activityID)


    if(result.status_code)
        res.status(result.status_code).json(result)
    else
        res.status(200).json(result)
    
})  

router.post("/", cors(), bodyParserJSON, async(req, res) => {

    let dataBody = req.body
    let contentType = req.headers['content-type']

    let result = await controllerAttempt.setAttempt(dataBody, contentType)
    
    if(result.status_code)
        res.status(result.status_code).json(result)
    else
        res.status(200).json(result)
    
}) 