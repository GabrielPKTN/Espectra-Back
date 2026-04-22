module.exports = {
    serie_escolar: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "grau_suporte_id",
                "example": 1
            },
            "serie": {
                "type": "string",
                "description": "grau_suporte",
                "example": "Grau 2"
            }
        }
    },
    grau_suporte_id: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "grau_suporte_id",
                "example": 1
            }
        }
    }
}