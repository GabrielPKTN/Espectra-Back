
module.exports = {
    put: {
        tags: ['EndPoints [PACIENTES]'],
        description: "Atualiza um paciente no sistema",
        operationId: "atualizarPaciente",
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schema/pacientePost"
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
                            $ref: "#/components/schema/pacienteGet"
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
                description: "Não encontrado",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schema/error404"
                        }
                    }
                }
            },
            415: {
                description: "Tipos de dados inválidos",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schema/error415"
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