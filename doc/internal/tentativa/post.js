module.exports = {
    post: {
        tag: ["EndPoints [TENTATIVAS]"],
        description: 'Cadastra uma nova Tentativa no sistema.',
        operationId: 'inserirTentativa',
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/tentativaPost"
                    }
                }
            }
        },
        responses: {
            200: {
                description: "Requisição bem sucedida",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/tentativa"
                        }
                    }
                }
            },
            400: {
                description: "Campo inválido",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error400"
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
             415: {
                description: "Tipos de dados inválidos.",
                content: {
                    "appplication/json": {
                         schema: {
                            $ref: "#/components/schemas/error415"
                        }
                    }
                }
            },
            500: {
                description: "Não foi possível processar a requisição por erros internos da Controller",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error500_controller"
                        }
                    }
                }
            },
            500: {
                description: "Não foi possível processar a requisição por erros internos da Model",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error500_model"
                        }
                    }
                }
            },
             500: {
                description: "Não foi possível processar a requisição por erros na inserção de dados em tabelas relacionais",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error500_relatinal_insertion"
                        }
                    }
                }
            }
        }
    }
}