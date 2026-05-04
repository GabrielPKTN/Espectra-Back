/********************************************************************************
 * Objetivo: Arquivo responsável pelas rotas de Endpoints de Paciente
 * Data: 30/04/2026
 * Autores: Enzo Carrilho
 * Versão: 1.0
 ********************************************************************************/

const express = require('express')
const router = express.Router()
const controllerPaciente = require('../../controller/paciente/controllerPaciente.js')

router.get("/:id", async(req, res) => {
    const id = req.params.id
    
    let result = await controllerPaciente.getPatientById(id)
    res.status(200).json(result)
})    

router.get("/", async(req, res) => {
    const registNumber = req.query.regist_number
    
    let result = await controllerPaciente.getPatientByRegistNumber(registNumber)
    res.status(200).json(result)
})  


module.exports = router