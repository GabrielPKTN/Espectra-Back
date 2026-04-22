module.exports = {
    paciente: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "nome": {
                "type": "string",
                "description": "name",
                "example": "Mario Augusto Ramos"
            },
            "data_nascimento": {
                "type": "string",
                "description": "birth_date",
                "example": "2010-08-12"
            },
             "diagnostico": {
                "type": "string",
                "description": "diagnostico",
                "example": "Autismo e TDAH"
            },
            "serie_escolar": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/serie_escolar"
                }
            },
            "grau_suporte": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/grau_suporte"
                }
            },
            "psicopedagogo": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/psicopedagogo"
                }
            }
        }
    },
    pacienteGet: {
        type: 'object',
        properties: {
              "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "nome": {
                "type": "string",
                "description": "name",
                "example": "Mario Augusto Ramos"
            },
            "data_nascimento": {
                "type": "string",
                "description": "birth_date",
                "example": "1977-10-24"
            },
             "diagnostico": {
                "type": "string",
                "description": "diagnostico",
                "example": "Autismo e TDAH"
            },
            "serie_escolar": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/serie_escolar"
                }
            },
            "grau_suporte": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/grau_suporte"
                }
            },
            "psicopedagogo": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/psicopedagogo"
                }
            },
            "responsaveis": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/responsavel"
                }
            }
        }
    },
    pacientePost: {
        type: 'object',
        properties: {
             "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "nome": {
                "type": "string",
                "description": "name",
                "example": "Mario Augusto Ramos"
            },
            "data_nascimento": {
                "type": "string",
                "description": "birth_date",
                "example": "1977-10-24"
            },
             "diagnostico": {
                "type": "string",
                "description": "diagnostico",
                "example": "Autismo e TDAH"
            },
            "serie_escolar_id": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/serie_escolar_id"
                }
            },
            "grau_suporte_id": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/grau_suporte_id"
                }
            },
            "psicopedagogo_id": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/psicopedagogo/login"
                }
            }
        }
    }
}