module.exports = {
    serie_escolar: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "serie_id",
                "example": 1
            },
            "serie": {
                "type": "string",
                "description": "serie_escolar",
                "example": "1º ano"
            }
        }
    },
    serie_escolar_id: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "serie_id",
                "example": 1
            }
        }
    }
}