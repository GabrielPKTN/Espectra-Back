/********************************************************************************
 * Objetivo: Arquivo responsável pelas rotas de Endpoints de Paciente
 * Data: 30/04/2026
 * Autores: Nicolas dos Santos
 * Versão: 1.0
 ********************************************************************************/

const express = require('express')
const router = express.Router()
const controllerPaciente = ('../../controller/paciente/controllerPaciente.js')

router.get("/:id")