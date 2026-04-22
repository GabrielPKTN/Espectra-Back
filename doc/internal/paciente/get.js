const { response } = require("express");

module.exports = {
    get: {
        tag: ["EndPoints [PACIENTES]"],
        description: "Retorna todos os Pacientes cadastrados no sistema",
        operationId: "listarPacientes",
        responses: {
            200: {
                description: "Requisicao bem sucedida",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/paciente"
                        }
                    }
                }
            },
            404: {
                description: "Não encontrado",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/error404"
                        }
                    }
                }
            },
            500: {
                description: "Erros Internos",
                 content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/error500"
                        }
                    }
                }
            }
        }
    }
    
}