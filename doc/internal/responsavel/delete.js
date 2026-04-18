module.exports = {
    get: {
        tags: ['EndPoints [RESPONSÁVEL]'],
        description: "Exclui um responsável baseado no seu Id",
        operationId: "deletarResponsavel",
        parameters: [{
            name: "id",
            in: "path",
            description: "Id do Responsável",
            required: true,
            schema: {
                type: "int",
                format: "int64"
            }
        }],

        responses: {
            200: {
                description: "Requisição bem sucedida",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schema/responsableGet"
                        }
                    }
                }
            },
            400: {
                description: "Campo inválido",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schema/error400"
                        }
                    }
                }
            },
            404: {
                description: "O Id informado não foi encontrado",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schema/error404"
                        }
                    }
                }
            },
            500: {
                description: "Não foi possível processar a requisição por erros internos da Controller",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schema/error500_controller"
                        }
                    }
                }
            },
            500: {
                description: "Não foi possível processar a requisição por erros internos da Model",
                content: {
                    "appkication/json": {
                        schema: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schema/error500_model"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}