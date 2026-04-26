module.exports = {
    get: {
        tags: ["EndPoints [ATIVIDADE PERSONALIZADA]"],
        description: 'Retorna todas as atividades personalizadas cadastradas no sistema.',
        operationId: 'listarAtividadesPersonalizadas',
        responses: {
            200: {
                description: "Requisição bem sucedida",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/atividade_personalizadaGet"
                        }
                    }
                }
            },
            404: {
                description: "Não encontrado",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error404"
                        }
                    }
                }
            },
            500: {
                description: "Não foi possível processar a requisião por erros internos",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error500"
                        }
                    }
                }
            }
        }
    }
}