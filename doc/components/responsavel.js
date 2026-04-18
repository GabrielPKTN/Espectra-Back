module.exports = {
    responsavel: {
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
                "example": "Nicolas dos Santos Durão"
            },
            "data_nascimento": {
                "type": "string",
                "description": "birth_date",
                "example": "2008-06-16"
            },
            "telefone": {
                "type": "string",
                "description": "telephone",
                "example": "(11) 11111-1111"
            },
            "email": {
                "type": "string",
                "description": "email",
                "example": "seuemail@gmai.com"
            },
            "senha": {
                "type": "string",
                "description": "password",
                "example": "senha1234@"
            }
        }
    }
}