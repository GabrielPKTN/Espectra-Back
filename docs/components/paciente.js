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
                "example": "Julia Nogueira Silva"
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
                "type": "int",
                "description": "id",
                "example": 3
            },
             "grau_suporte_id": {
                "type": "int",
                "description": "id",
                "example": 2
            },
             "psicopedagogo_id": {
                "type": "int",
                "description": "id",
                "example": 8
            },
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
                "example": "Julia Nogueira Silva"
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
                    $ref: "#/components/schemas/serieEscolar"
                },
            },
             "grau_suporte": {
                 "type": "array",
                "items": {
                    $ref: "#/components/schemas/grauSuporte"
                },
            },
             "psicopedagogo": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/psicopedagogo"
                },
            },
        }
    }
}