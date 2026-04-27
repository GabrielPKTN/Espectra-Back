module.exports = {

    atividadeTipoPortage: {
        
        type: "object",
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "id_paciente": {
                "type": "int",
                "description": "id_paciente",
                "example": 22
            },
            "atividade_personalizada": {
                "type": "object",
                "description": "atividade personalizada",
                "example": []
            },
            "atividade_portage": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/atividade_portage"
                }
            },
            "status_atividade": {
                "type": "string",
                "description": "status da atividade",
                "example": "Em andamento"
            }
        }
    },

    atividadeTipoPortagePost: {
        type: "object",
        properties: {
            "id_status_atividade": {
                "type": "int",
                "description": "id_status_atividade",
                "example": 1
            },
            "id_paciente": {
                "type": "int",
                "description": "id_paciente",
                "example": 22
            },
            "id_atividade_personalizada": {
                "type": "int",
                "description": "id_atividade_personalizada",
                "example": null
            },
            "id_atividade_portage": {
                "type": "int",
                "description": "id_atividade_personalizada",
                "example": 1
            }
        }
    }
}