const { psicopedagogoCreate } = require("../../components/psicopedagogo");

module.exports = {
    get: {
        tag: ["EndPoints [PSICOPEDAGOGOS]"],
        description: 'Retorna um Psicopedagogo do sistema pelo ID.',
        operationId: 'listarPsicopedagogoId',
        parameters: [{
            name: "id",
            in: "path",
            description: "ID do psicopedagogo",
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
                            $ref: "#/components/schemas/psicopedagogoGet"
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
            500: {
                description: "Erros Internos",
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