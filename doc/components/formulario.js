module.exports = {
    
    formulario: {
        type: 'object',
        properties: {
            "atividade_portage": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/atividade_portage"
                }
            },
            "id_resposta": {
                "type": "int",
                "description": "id da alternativa",
                "example": 1
            }
        }
    },

    formularioPutAlternativa: {
        type: 'object',
        properties: {
            "id_paciente": {
                "type": "int",
                "description": "id do paciente",
                "example": 1
            },
            "id_atividade_portage": {
                "type": "int",
                "description": "id da atividade-portage",
                "example": 1
            },
            "id_resposta": {
                "type": "int",
                "description": "id da alternativa",
                "example": 1
            }
        }
    }
}