/********************************************************************************
 * Objetivo: Arquivo responsável pelas rotas de Endpoints de Formulário
 * Data: 06/05/2026
 * Autores: Nicolas dos Santos
 * Versão: 1.0
 ********************************************************************************/

const express = require("express")
const router =  express.Router()
const controllerFormulario = require("../../controller/formulario/controllerFormulario.js")

router.get("/:id", async(req, res) => {
    const id = req.params.id
    let result = await controllerFormulario.listarFormularioPorPacienteId(id)
    res.status(result.status_code).json(result)
})

module.exports = router