module.exports = {
    tentativa: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "resultado": {
                "type": "boolean",
                "description": "result",
                "example": 1
            },
            "observacao": {
                "type": "string",
                "description": "observation",
                "example": ""
            },
            "nivel_auxilio": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/nivel_auxilio"
                }
            }
        }
    },
    tentativaGet: {
        type: 'object',
        properties: {
                "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "resultado": {
                "type": "boolean",
                "description": "result",
                "example": 1
            },
            "observacao": {
                "type": "string",
                "description": "observation",
                "example": ""
            },
            "nivel_auxilio": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/nivel_auxilio"
                }
            }
        }
    },
    tentativaPost: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "resultado": {
                "type": "boolean",
                "description": "result",
                "example": 1
            },
            "observacao": {
                "type": "string",
                "description": "observation",
                "example": ""
            },
            "nivel_auxilio_id": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/nivel_auxilio_id"
                }
            }
        }
    }
}