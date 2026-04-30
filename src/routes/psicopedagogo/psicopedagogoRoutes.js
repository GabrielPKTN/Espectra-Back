/********************************************************************************
 * Objetivo: Arquivo responsável pelas rotas de Endpoints de Psicopedagogo
 * Data: 30/04/2026
 * Autores: Nicolas dos Santos
 * Versão: 1.0
 ********************************************************************************/

const express = require("express")
const router = express.Router()
const controllerPsicopedagogo = require("../../controller/psicopedagogo/controllerPsicopedagogo.js")

router.get("/:id", async(req, res) => {
    let result = await controllerPsicopedagogo.listarPsicopedagogoPorId(req.params.id)
    res.status(result.status_code).json(result)
})

router.get("/home/:id", async(req, res) => {
    let result = await controllerPsicopedagogo.listarHomePsicopedagogoPorId(req.params.id)
    res.status(result.status_code).json(result)
})

router.get("/email/:email/senha/:password", async(req, res) => {
    let result = await controllerPsicopedagogo.loginEmailSenhaPsicopedagogo(req.params.email, req.params.password)
    res.status(result.status_code).json(result)
})

module.exports = router