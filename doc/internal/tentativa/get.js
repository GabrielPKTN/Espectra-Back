module.exports = {
     get: {
        tag: ["EndPoints [TENTATIVAS]"],
        description: "Retorna todas as Tentativas cadastrados no sistema",
        operationId: "listarTentativas",
        responses: {
            200: {
                description: "Requisicao bem sucedida",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/tentativa"
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